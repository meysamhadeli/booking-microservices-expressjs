import { RabbitmqOptionsBuilder } from './rabbitmq-options-builder';
import * as amqp from 'amqplib';
export declare class RabbitmqOptions {
    host: string;
    port: number;
    username: string;
    password: string;
}
export interface IRabbitMQConnection {
    createConnection(rabbitmqOptionsBuilder?: (rabbitmqOptionsBuilder?: RabbitmqOptionsBuilder) => void): Promise<amqp.Connection>;
    getChannel(): Promise<amqp.Channel>;
    closeChanel(): Promise<void>;
    closeConnection(): Promise<void>;
}
export declare class RabbitMQConnection implements IRabbitMQConnection {
    createConnection(rabbitmqOptionsBuilder?: (rabbitmqOptionsBuilder?: RabbitmqOptionsBuilder) => void): Promise<amqp.Connection>;
    getChannel(): Promise<amqp.Channel>;
    closeChanel(): Promise<void>;
    closeConnection(): Promise<void>;
}
