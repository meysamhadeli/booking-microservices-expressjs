import { RabbitmqOptionsBuilder } from './rabbitmq-options-builder';
import * as amqp from 'amqplib';
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
