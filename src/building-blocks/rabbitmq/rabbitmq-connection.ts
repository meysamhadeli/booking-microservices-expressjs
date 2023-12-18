import { container, injectable } from 'tsyringe';
import { Logger } from '../logging/logger';
import { RabbitmqOptionsBuilder } from './rabbitmq-options-builder';
import * as amqp from 'amqplib';
import config from '../config/config';
import asyncRetry from 'async-retry';

export class RabbitmqOptions {
  host: string;
  port: number;
  username: string;
  password: string;
}

let connection: amqp.Connection = null;
let channel: amqp.Channel = null;

export interface IRabbitMQConnection {
  createConnection(
    rabbitmqOptionsBuilder?: (rabbitmqOptionsBuilder?: RabbitmqOptionsBuilder) => void
  ): Promise<amqp.Connection>;

  getChannel(): Promise<amqp.Channel>;

  closeChanel(): Promise<void>;

  closeConnection(): Promise<void>;
}

@injectable()
export class RabbitMQConnection implements IRabbitMQConnection {
  async createConnection(
    rabbitmqOptionsBuilder?: (rabbitmqOptionsBuilder?: RabbitmqOptionsBuilder) => void
  ): Promise<amqp.Connection> {
    if (!connection || !connection == undefined) {
      try {
        const builder = new RabbitmqOptionsBuilder();
        rabbitmqOptionsBuilder(builder);

        const options = builder.build();

        const host = options?.host ?? config.rabbitmq.host;
        const port = options?.port ?? config.rabbitmq.port;

        await asyncRetry(
          async () => {
            connection = await amqp.connect(`amqp://${host}:${port}`, {
              username: options?.username ?? config.rabbitmq.username,
              password: options?.password ?? config.rabbitmq.password
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

        connection.on('error', async (error): Promise<void> => {
          Logger.error(`Error occurred on connection: ${error}`);
          await this.closeConnection();
          await this.createConnection();
        });
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

      channel.on('error', async (error): Promise<void> => {
        Logger.error(`Error occurred on channel: ${error}`);
        await this.closeChanel();
        await this.getChannel();
      });

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
