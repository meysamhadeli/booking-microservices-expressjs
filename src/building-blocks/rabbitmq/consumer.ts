import config from "../config/config";
import {snakeCase} from 'lodash';
import {getTypeName} from "../utils/reflection";
import {deserializeObject} from "../utils/serialization";
import {connection} from "./rabbitmq";
import Logger from "../logging/logger";
import { amqp } from 'amqplib';
import asyncRetry from 'async-retry';

export type handlerFunc<T> = (queue: string, message: T) => void;

export interface IConsumer {
    consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
}

export class Consumer implements IConsumer {
    constructor() {}

    async consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void> {
        let channel: amqp.Channel;

        try {
            // Use asyncRetry to retry channel creation and message consumption with a backoff strategy
            await asyncRetry(
                async () => {
                    if (connection === null) {
                        throw new Error('Connection is not established.');
                    }

                    channel = await connection.createChannel();

                    const exchangeName = snakeCase(getTypeName(type));

                    await channel.assertExchange(exchangeName, 'topic', { durable: false });

                    const queueName = `${exchangeName}_queue`;
                    const bindingKey = exchangeName;

                    await channel.assertQueue(queueName, { exclusive: true });
                    channel.bindQueue(queueName, exchangeName, bindingKey);

                    Logger.info(`Waiting for messages with binding key "${bindingKey}". To exit, press CTRL+C`);

                    channel.consume(
                        queueName,
                        (message) => {
                            if (message !== null) {
                                channel.ack(message);
                                const messageContent = message?.content?.toString();
                                handler(queueName, deserializeObject<T>(messageContent));
                                Logger.info(`message: ${messageContent} delivered to queue: ${queueName}`);
                                if (channel) channel.close();
                            }
                        },
                        { noAck: false }
                    );
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
