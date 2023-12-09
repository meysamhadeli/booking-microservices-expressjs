import * as amqp from 'amqplib';
import { Logger } from '../logging/logger';
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
export declare class RabbitMQConnection implements IRabbitMQConnection {
    logger: Logger;
    createConnection(options?: RabbitmqOptions): Promise<amqp.Connection>;
    getChannel(): Promise<amqp.Channel>;
    closeChanel(): Promise<void>;
    closeConnection(): Promise<void>;
}
export declare class Publisher implements IPublisher {
    logger: Logger;
    publishMessage<T>(message: T): Promise<void>;
    isPublished<T>(message: T): Promise<boolean>;
}
export declare class Consumer implements IConsumer {
    logger: Logger;
    consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
    isConsumed<T>(message: T): Promise<boolean>;
}
export {};
