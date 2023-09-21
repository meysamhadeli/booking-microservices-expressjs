import {snakeCase} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {getUnixTime} from 'date-fns';
import asyncRetry from 'async-retry';
import {container, Lifecycle, scoped} from 'tsyringe';
import {getTypeName} from "../utils/reflection";
import {serializeObject} from "../utils/serialization";
import config from "../config/config";
import Logger from "../logging/logger";
import {RabbitMQConnection} from "./rabbitmq";

export interface IPublisher {
    publishMessage<T>(message: T): Promise<void>;
}

@scoped(Lifecycle.ResolutionScoped)
export class Publisher implements IPublisher {
    async publishMessage<T>(message: T) {
        const rabbitMQConnection = container.resolve(RabbitMQConnection);
        try {
            await asyncRetry(
                async () => {
                    const channel = await rabbitMQConnection.getChannel();

                    const exchangeName = snakeCase(getTypeName(message));
                    const routingKey = exchangeName;
                    const serializedMessage = serializeObject(message);

                    // Start a new span for this RabbitMQ operation
                    //const span = this.tracer.startSpan(`publish_message_${exchangeName}`);

                    await channel.assertExchange(exchangeName, 'topic', {durable: false});

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

                    // Set attributes on the span
                    //span.setAttributes(messageProperties);

                    // Ensure the span ends when this operation is complete
                    //span.end();
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
