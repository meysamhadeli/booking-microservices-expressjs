import * as amqp from 'amqplib';
import asyncRetry from 'async-retry';
import Logger from '../logging/logger';
import config from '../config/config';
import { container, injectable, singleton } from 'tsyringe';
import { OpenTelemetryTracer } from '../openTelemetry/otel';
import { getTypeName } from '../utils/reflection';
import { deserializeObject, serializeObject } from '../utils/serialization';
import { getUnixTime } from 'date-fns';
import { snakeCase } from 'lodash';
import { sleep } from '../utils/time';
import { v4 as uuidv4 } from 'uuid';

let connection: amqp.Connection = null;
let channel: amqp.Channel = null;

const publishedMessages: string[] = [];
const consumedMessages: string[] = [];
type handlerFunc<T> = (queue: string, message: T) => void;

export interface RabbitmqOptions {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface IRabbitMQConnection {
  createConnection(options: RabbitmqOptions): Promise<amqp.Connection>;

  getChannel(): Promise<amqp.Channel>;

  closeChanel(): Promise<void>;

  closeConnection(): Promise<void>;
}

export interface IPublisher {
  publishMessage<T>(message: T): Promise<void>;
  isPublished<T>(message: T): Promise<boolean>;
}

export interface IConsumer {
  consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
  isConsumed<T>(message: T): Promise<boolean>;
}

@singleton()
export class RabbitMQConnection implements IRabbitMQConnection {
  async createConnection(options: RabbitmqOptions): Promise<amqp.Connection> {
    if (!connection || !connection == undefined) {
      try {
        await asyncRetry(
          async () => {
            connection = await amqp.connect(`amqp://${options.host}:${options.port}`, {
              username: options.username,
              password: options.password
            });

            Logger.info('RabbitMq connection created successfully');
          },
          {
            retries: config.retry.count,
            factor: config.retry.factor,
            minTimeout: config.retry.minTimeout,
            maxTimeout: config.retry.maxTimeout
          }
        );
      } catch (error) {
        throw new Error('Rabbitmq connection is failed!');
      }
    }
    return connection;
  }

  async getChannel(): Promise<amqp.Channel> {
    try {
      if (!connection) {
        throw new Error('Rabbitmq connection is failed!');
      }

      if ((connection && !channel) || !channel) {
        await asyncRetry(
          async () => {
            channel = await connection.createChannel();
            Logger.info('Channel Created successfully');
          },
          {
            retries: config.retry.count,
            factor: config.retry.factor,
            minTimeout: config.retry.minTimeout,
            maxTimeout: config.retry.maxTimeout
          }
        );
      }
      return channel;
    } catch (error) {
      Logger.error('Failed to get channel!');
    }
  }

  async closeChanel(): Promise<void> {
    try {
      if (channel) {
        await channel.close();
        Logger.info('Channel closed successfully');
      }
    } catch (error) {
      Logger.error('Channel close failed!');
    }
  }

  async closeConnection(): Promise<void> {
    try {
      if (connection) {
        await connection.close();
        Logger.info('Connection closed successfully');
      }
    } catch (error) {
      Logger.error('Connection close failed!');
    }
  }
}

@injectable()
export class Publisher implements IPublisher {
  async publishMessage<T>(message: T) {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer('rabbitmq-publisher');

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(message));
          const routingKey = exchangeName;
          const serializedMessage = serializeObject(message);

          // Start a new span for this RabbitMQ operation
          const span = tracer.startSpan(`publish_message_${exchangeName}`);

          await channel.assertExchange(exchangeName, 'topic', { durable: false });

          // Create custom message properties
          const messageProperties = {
            messageId: uuidv4().toString(),
            timestamp: getUnixTime(new Date()),
            contentType: 'application/json',
            exchange: exchangeName,
            routingKey: routingKey,
            type: 'topic'
          };

          channel.publish(exchangeName, routingKey, Buffer.from(serializedMessage), {
            headers: messageProperties
          });

          Logger.info(`Message: ${serializedMessage} sent with routing key "${routingKey}"`);

          publishedMessages.push(exchangeName);

          // Set attributes on the span
          span.setAttributes(messageProperties);

          // Ensure the span ends when this operation is complete
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
    const messageType = snakeCase(getTypeName(message));

    const isPublished = publishedMessages.includes(messageType);

    return Promise.resolve(isPublished);
  }
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

                consumedMessages.push(exchangeName);

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

    const sleep = (ms: number): Promise<void> =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async isConsumed<T>(message: T): Promise<boolean> {
    const timeoutTime = 20000; // 20 seconds in milliseconds
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

      const typeName = snakeCase(getTypeName(message));

      isConsumed = consumedMessages.includes(typeName);

      timeOutExpired = Date.now() - startTime > timeoutTime;
    }
  }
}
