import { amqp } from 'amqplib';
import { snakeCase } from 'lodash';
import { getTypeName } from "../utils/reflection";
import { serializeObject } from "../utils/serialization";
import { connection } from "./rabbitmq";
import asyncRetry from 'async-retry';
import config from "../config/config";
import Logger from "../logging/logger";

export interface IPublisher {
    publishMessage<T>(message: T): Promise<void>;
}

export class Publisher implements IPublisher {
    constructor() {}
    async publishMessage<T>(message: T ) {
        let channel: amqp.Channel;

        try {
            await asyncRetry(
                async () => {
                    if (connection === null) {
                        throw new Error('Connection is not established.');
                    }

                    channel = await connection.createChannel();

                    const exchangeName = snakeCase(getTypeName(message));

                    const routingKey = exchangeName;

                    const serializedMessage = serializeObject(message);

                    // Send the message to the exchange with the specified routing key
                    channel.publish(exchangeName, routingKey, Buffer.from(serializedMessage));

                    Logger.info(`Sent: ${message} with routing key "${routingKey}"`);
                    if (channel) channel.close();
                },
                {
                    retries: config.retry.count,
                    factor: config.retry.factor,
                    minTimeout: config.retry.minTimout,
                    maxTimeout: config.retry.maxTimeout
                }
            );
        } catch (error) {
            if (channel) channel.close();

            throw new Error(error);
        }
    }
}
