import * as amqp from 'amqplib';
import asyncRetry from 'async-retry';
import config from '../config/config';
import { container, inject, injectable, singleton } from 'tsyringe';
import { OpenTelemetryTracer } from '../openTelemetry/otel';
import { getTypeName } from '../utils/reflection';
import { deserializeObject, serializeObject } from '../utils/serialization';
import { getUnixTime } from 'date-fns';
import { snakeCase } from 'lodash';
import { sleep } from '../utils/time';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../logging/logger';

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
  createConnection(): Promise<amqp.Connection>;

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

@injectable()
export class RabbitMQConnection implements IRabbitMQConnection {
  logger = container.resolve(Logger);
  async createConnection(options?: RabbitmqOptions): Promise<amqp.Connection> {
    if (!connection || !connection == undefined) {
      try {
        const host = options?.host ?? config.rabbitmq.host;
        const port = options?.port ?? config.rabbitmq.port;

        await asyncRetry(
          async () => {
            connection = await amqp.connect(`amqp://${host}:${port}`, {
              username: options?.username ?? config.rabbitmq.username,
              password: options?.password ?? config.rabbitmq.password
            });

            this.logger.info('RabbitMq connection created successfully');
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
            this.logger.info('Channel Created successfully');
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
      this.logger.error('Failed to get channel!');
    }
  }

  async closeChanel(): Promise<void> {
    try {
      if (channel) {
        await channel.close();
        this.logger.info('Channel closed successfully');
      }
    } catch (error) {
      this.logger.error('Channel close failed!');
    }
  }

  async closeConnection(): Promise<void> {
    try {
      if (connection) {
        await connection.close();
        this.logger.info('Connection closed successfully');
      }
    } catch (error) {
      this.logger.error('Connection close failed!');
    }
  }
}

@injectable()
export class Publisher implements IPublisher {
  logger = container.resolve(Logger);

  async publishMessage<T>(message: T) {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer('rabbitmq-publisher');

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

@injectable()
export class Consumer implements IConsumer {
  logger = container.resolve(Logger);

  async consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void> {
    const rabbitMQConnection = container.resolve(RabbitMQConnection);
    const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
    const tracer = await openTelemetryTracer.createTracer('rabbitmq-consumer');

    try {
      await asyncRetry(
        async () => {
          const channel = await rabbitMQConnection.getChannel();

          const exchangeName = snakeCase(getTypeName(type));

          await channel.assertExchange(exchangeName, 'fanout', { durable: false });

          const q = await channel.assertQueue('', { exclusive: true });

          await channel.bindQueue(q.queue, exchangeName, '');

          this.logger.info(
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
                this.logger.info(
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
      this.logger.error(error);
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
