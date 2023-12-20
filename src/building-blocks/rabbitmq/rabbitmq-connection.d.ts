import * as amqp from 'amqplib';
import { RabbitmqConnectionOptions } from "./rabbitmq-connection-options-builder";
export interface IRabbitMQConnection {
    createConnection(options?: RabbitmqConnectionOptions): Promise<amqp.Connection>;
    getConnection(): Promise<amqp.Connection>;
    getChannel(): Promise<amqp.Channel>;
    closeChanel(): Promise<void>;
    closeConnection(): Promise<void>;
}
export declare class RabbitMQConnection implements IRabbitMQConnection {
    createConnection(options?: RabbitmqConnectionOptions): Promise<amqp.Connection>;
    getConnection(): Promise<amqp.Connection>;
    getChannel(): Promise<amqp.Channel>;
    closeChanel(): Promise<void>;
    closeConnection(): Promise<void>;
}
