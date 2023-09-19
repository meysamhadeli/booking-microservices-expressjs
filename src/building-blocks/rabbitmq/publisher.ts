import  {amqp} from 'amqplib';
import { snakeCase } from 'lodash';
import {getTypeName} from "../utils/reflection";
import {serializeObject} from "../utils/serialization";
import {connection} from "./rabbitmq";

export interface IPublisher {
    publishMessage<T>(message: T): Promise<void>;
}

export class Publisher implements IPublisher {
    constructor() {}
    async publishMessage<T>(message: T ) {
        let channel: amqp.Channel;

        try {
            if (connection === null) {
                throw new Error('Connection is not established.');
            }

            channel = await connection.createChannel();

            const exchangeName = snakeCase(getTypeName(message));

            const routingKey = exchangeName;

            const serializedMessage = serializeObject(message);

            // Send the message to the exchange with the specified routing key
            channel.publish(exchangeName, routingKey, Buffer.from(serializedMessage));
            console.log(`Sent: ${message} with routing key "${routingKey}"`);
            channel.close();

        }catch (error){
            console.log(error);
            channel.close();
            throw new Error(error);
        }
    }
}
