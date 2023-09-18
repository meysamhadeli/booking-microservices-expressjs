import * as amqp from 'amqplib';
import {snakeCase} from 'lodash';
import {getTypeName} from "../utils/reflection";
import {deserializeObject} from "../utils/serialization";

export type handlerFunc<T> = (queue: string, message: T) => void;

export interface IConsumer {
    consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
}

export class Consumer implements IConsumer {
    constructor(private connection: amqp.Connection) {
    }

    async consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void> {
        let channel: amqp.Channel;
        try {
            if (this.connection === null) {
                throw new Error('Connection is not established.');
            }

            channel = await this.connection.createChannel();

            const exchangeName = snakeCase(getTypeName(type));

            // Declare the exchange as 'topic' to enable topic-based routing
            await channel.assertExchange(exchangeName, 'topic', {durable: false});

            // Define a unique queue name for this subscriber
            const queueName = `${exchangeName}_queue`;
            const bindingKey = exchangeName;

            // Create a queue and bind it to the exchange with the specified binding key
            await channel.assertQueue(queueName, {exclusive: true});
            channel.bindQueue(queueName, exchangeName, bindingKey);

            console.log(`Waiting for messages with binding key "${bindingKey}". To exit, press CTRL+C`);

            // Consume messages from the queue
            channel.consume(
                queueName,
                (message) => {
                    if (message !== null) {
                        channel.ack(message); // Acknowledge the message
                        const messageContent = message?.content?.toString();
                        handler(queueName, deserializeObject<T>(messageContent));
                        console.log(`message: ${messageContent} delivered to queue: ${queueName}`);
                        channel.close(); // Close channel after receive and ack message
                    }
                },
                {noAck: false} // Ensure that we acknowledge messages
            );
        } catch (error) {
            console.log(error);
            channel.close();
            throw new Error(error);
        }
    }
}
