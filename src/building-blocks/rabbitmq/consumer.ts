import { snakeCase } from 'lodash';
import asyncRetry from 'async-retry';
import { getTypeName } from '../utils/reflection';
import Logger from '../logging/logger';
import { deserializeObject } from '../utils/serialization';
import config from '../config/config';
import { RabbitMQConnection } from './rabbitmq';
import { container, injectable } from 'tsyringe';
import { OpenTelemetryTracer } from '../openTelemetry/otel';

export type handlerFunc<T> = (queue: string, message: T) => void;

export interface IConsumer {
  consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
}

@injectable()
export class Consumer implements IConsumer {
  async consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void> {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer('rabbitmq-consumer');

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(type));

          // Declare the exchange as 'topic' to enable topic-based routing
          await channel.assertExchange(exchangeName, 'topic', { durable: false });

          // Define a unique queue name for this subscriber
          const queueName = `${exchangeName}_queue`;
          const bindingKey = exchangeName;

          // Create a queue and bind it to the exchange with the specified binding key
          await channel.assertQueue(queueName, { exclusive: true });

          await channel.bindQueue(queueName, exchangeName, bindingKey);

          Logger.info(
            `Waiting for messages with binding key "${bindingKey}". To exit, press CTRL+C`
          );

          // Consume messages from the queue
          await channel.consume(
            queueName,
            (message) => {
              if (message !== null) {
                // Start a new span for this RabbitMQ operation
                const span = tracer.startSpan(`receive_message_${exchangeName}`);

                const messageContent = message?.content?.toString();
                const headers = message.properties.headers || {};

                handler(queueName, deserializeObject<T>(messageContent));
                Logger.info(`Message: ${messageContent} delivered to queue: ${queueName}`);
                channel.ack(message); // Acknowledge the message
                // Set attributes on the span
                span.setAttributes(headers);
                // End the message handling span
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
  }
}
