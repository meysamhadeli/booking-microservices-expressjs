import { container, injectable } from 'tsyringe';
import { Logger } from '../logging/logger';
import { getTypeName } from '../utils/reflection';
import { serializeObject } from '../utils/serialization';
import { getUnixTime } from 'date-fns';
import config from '../config/config';
import { RabbitMQConnection } from './rabbitmq-connection';
import asyncRetry from 'async-retry';
import { snakeCase } from 'typeorm/util/StringUtils';
import { v4 as uuidv4 } from 'uuid';
import { OtelDiagnosticsProvider } from '../open-telemetry/otel-diagnostics-provider';

const publishedMessages: string[] = [];

export interface IPublisher {
  publishMessage<T>(message: T): Promise<void>;

  isPublished<T>(message: T): Promise<boolean>;
}

@injectable()
export class Publisher implements IPublisher {
  async publishMessage<T>(message: T) {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const otelDiagnosticsProvider = container.resolve(OtelDiagnosticsProvider);
    const tracer = otelDiagnosticsProvider.getTracer();

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(message));
          const serializedMessage = serializeObject(message);

          const span = tracer.startSpan(`publish_message_${exchangeName}`);

          await channel.assertExchange(exchangeName, 'fanout', { durable: false });

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

          Logger.info(`Message: ${serializedMessage} sent with exchange name "${exchangeName}"`);

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
      Logger.error(error);
      await rabbitMQConnection.closeChanel();
    }
  }

  async isPublished<T>(message: T): Promise<boolean> {
    const exchangeName = snakeCase(getTypeName(message));

    const isPublished = publishedMessages.includes(exchangeName);

    return Promise.resolve(isPublished);
  }
}
