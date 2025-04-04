import { injectable } from 'tsyringe';
import { Logger } from '../logging/logger';
import * as amqp from 'amqplib';
import config from '../config/config';
import asyncRetry from 'async-retry';
import { RabbitmqConnectionOptions } from './rabbitmq-connection-options-builder';
import {ChannelModel} from "amqplib";

let connection: ChannelModel = null;
let channel: amqp.Channel = null;

export interface IRabbitMQConnection {
  createConnection(options?: RabbitmqConnectionOptions): Promise<amqp.ChannelModel>;

  getConnection(): Promise<amqp.ChannelModel>;

  getChannel(): Promise<amqp.Channel>;

  closeChanel(): Promise<void>;

  closeConnection(): Promise<void>;
}

@injectable()
export class RabbitMQConnection implements IRabbitMQConnection {
  async createConnection(options?: RabbitmqConnectionOptions): Promise<amqp.ChannelModel> {
    if (!connection || !connection == undefined) {
      try {

        const rabbitConfig = {
          protocol: 'amqp',
          hostname: options?.host ?? config.rabbitmq.host,
          port: options?.port ?? config.rabbitmq.port,
          username: options?.username ?? config.rabbitmq.username,
          password: options?.password ?? config.rabbitmq.password,
        };

        await asyncRetry(
          async () => {

            connection = await amqp.connect(rabbitConfig);

            Logger.info('Rabbitmq connection created successfully');

            process.on('SIGINT', async () => {
              if (connection) {
                await this.closeConnection();
              }
            });
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

  async getConnection(): Promise< amqp.ChannelModel> {
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
        await connection;
        Logger.info('Connection rabbitmq closed gracefully!');
      }
    } catch (error) {
      Logger.error('Connection rabbitmq close failed!');
    }
  }
}
