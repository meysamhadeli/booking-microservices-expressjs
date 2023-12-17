import {container, injectable} from 'tsyringe';
import {Logger} from '../logging/logger';
import {OpenTelemetryTracer} from '../open-telemetry/open-telemetry';
import {getTypeName} from '../utils/reflection';
import {serializeObject} from '../utils/serialization';
import {getUnixTime} from 'date-fns';
import config from '../config/config';
import {RabbitMQConnection} from './rabbitmq-connection';
import asyncRetry from 'async-retry';
import {snakeCase} from 'typeorm/util/StringUtils';
import {v4 as uuidv4} from 'uuid';

const publishedMessages: string[] = [];

export interface IPublisher {
  publishMessage<T>(message: T): Promise<void>;

  isPublished<T>(message: T): Promise<boolean>;
}

@injectable()
export class Publisher implements IPublisher {
  logger = container.resolve(Logger);

  async publishMessage<T>(message: T) {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer(x => x.serviceName = 'rabbitmq-publisher');

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(message));
          const serializedMessage = serializeObject(message);

          const span = tracer.startSpan(`publish_message_${exchangeName}`);

          await channel.assertExchange(exchangeName, 'fanout', {durable: false});

          const messageProperties = {
            messageId: uuidv4().toString(),
            timestamp: getUnixTime(new Date()),
            contentType: 'application/json',
            exchange: exchangeName,
            type: 'fanout'
          };

          channel.publish(exchangeName, '', Buffer.from(serializedMessage), {
            headers: messageProperties
          });

          this.logger.info(
            `Message: ${serializedMessage} sent with exchange name "${exchangeName}"`
          );

          publishedMessages.push(exchangeName);

          span.setAttributes(messageProperties);

          span.end();
        },
        {
          retries: config.retry.count,
          factor: config.retry.factor,
          minTimeout: config.retry.minTimeout,
          maxTimeout: config.retry.maxTimeout
        }
      );
    } catch (error) {
      this.logger.error(error);
      await rabbitMQConnection.closeChanel();
    }
  }

  async isPublished<T>(message: T): Promise<boolean> {
    const exchangeName = snakeCase(getTypeName(message));

    const isPublished = publishedMessages.includes(exchangeName);

    return Promise.resolve(isPublished);
  }
}
