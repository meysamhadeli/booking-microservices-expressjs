import {snakeCase} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {getUnixTime} from 'date-fns';
import asyncRetry from 'async-retry';
import {getTypeName} from "../utils/reflection";
import {serializeObject} from "../utils/serialization";
import config from "../config/config";
import Logger from "../logging/logger";
import {RabbitMQConnection} from "./rabbitmq";
import {container, injectable} from "tsyringe";
import {OpenTelemetryTracer} from "../openTelemetry/otel";

export interface IPublisher {
    publishMessage<T>(message: T): Promise<void>;
}

@injectable()
export class Publisher implements IPublisher {
    async publishMessage<T>(message: T) {
        const rabbitMQConnection = container.resolve(RabbitMQConnection);
        const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
        const tracer = await openTelemetryTracer.createTracer("rabbitmq-publisher");

        try {
            await asyncRetry(
                async () => {
                    const channel = await rabbitMQConnection.getChannel();

                    const exchangeName = snakeCase(getTypeName(message));
                    const routingKey = exchangeName;
                    const serializedMessage = serializeObject(message);

                    // Start a new span for this RabbitMQ operation
                    const span = tracer.startSpan(`publish_message_${exchangeName}`);

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
}
