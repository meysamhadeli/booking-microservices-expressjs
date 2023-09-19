import * as amqp from 'amqplib';
import asyncRetry from 'async-retry';
import Logger from "../logging/logger";
import config from "../config/config";

export let connection: amqp.Connection;

export class RabbitMQConnection {
    async createConnection(): Promise<void> {
        try {
            await asyncRetry(
                async () => {
                    connection = await amqp.connect(`amqp://${config.rabbitmq.host}`);
                    Logger.info("Connection for rabbitmq established.");
                },
                {
                    retries: config.retry.count,
                    factor: config.retry.factor,
                    minTimeout: config.retry.minTimout,
                    maxTimeout: config.retry.maxTimeout
                }
            );
        } catch (error) {
            Logger.error("Connection for rabbitmq failed!");
            throw new Error(error);
        }
    }
}
