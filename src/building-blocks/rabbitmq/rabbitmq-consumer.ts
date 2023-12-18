import asyncRetry from 'async-retry';
import config from '../config/config';
import { container, injectable } from 'tsyringe';
import { getTypeName } from '../utils/reflection';
import { deserializeObject } from '../utils/serialization';
import { snakeCase } from 'lodash';
import { sleep } from '../utils/time';
import { Logger } from '../logging/logger';
import { OpenTelemetryTracer } from '../open-telemetry/open-telemetry';
import { RabbitMQConnection } from './rabbitmq-connection';

const consumedMessages: string[] = [];
type handlerFunc<T> = (queue: string, message: T) => void;

export interface IConsumer {
  consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;

  isConsumed<T>(message: T): Promise<boolean>;
}

@injectable()
export class Consumer implements IConsumer {
  async consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void> {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer(
      (x) => (x.serviceName = 'rabbitmq-consumer')
    );

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(type));

          await channel.assertExchange(exchangeName, 'fanout', { durable: false });

          const q = await channel.assertQueue('', { exclusive: true });

          await channel.bindQueue(q.queue, exchangeName, '');

          Logger.info(
            `Waiting for messages with exchange name "${exchangeName}". To exit, press CTRL+C`
          );

          await channel.consume(
            q.queue,
            (message) => {
              if (message !== null) {
                const span = tracer.startSpan(`receive_message_${exchangeName}`);

                const messageContent = message?.content?.toString();
                const headers = message.properties.headers || {};

                handler(q.queue, deserializeObject<T>(messageContent));
                Logger.info(
                  `Message: ${messageContent} delivered to queue: ${q.queue} with exchange name ${exchangeName}`
                );
                channel.ack(message);

                consumedMessages.push(exchangeName);

                span.setAttributes(headers);
                span.end();
              }
            },
            { noAck: false } // Ensure that we acknowledge messages
          );
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

    const sleep = (ms: number): Promise<void> =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async isConsumed<T>(message: T): Promise<boolean> {
    const timeoutTime = 30000; // 30 seconds in milliseconds
    const startTime = Date.now();
    let timeOutExpired = false;
    let isConsumed = false;

    while (true) {
      if (timeOutExpired) {
        return false;
      }
      if (isConsumed) {
        return true;
      }

      await sleep(2000);

      const exchangeName = snakeCase(getTypeName(message));

      isConsumed = consumedMessages.includes(exchangeName);

      timeOutExpired = Date.now() - startTime > timeoutTime;
    }
  }
}
