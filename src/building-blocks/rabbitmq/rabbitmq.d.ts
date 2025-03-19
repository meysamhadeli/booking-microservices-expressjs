import { RabbitmqConnectionOptionsBuilder } from './rabbitmq-connection-options-builder';
import { RabbitmqConsumerOptionsBuilder } from './rabbitmq-consumer-options-builder';
export interface IRabbitmq {
    createConnection(connectionOptionsBuilder?: (builder: RabbitmqConnectionOptionsBuilder) => void): Promise<IRabbitmq>;
    addConsumer(consumerOptionsBuilder?: (builder: RabbitmqConsumerOptionsBuilder) => void): Promise<IRabbitmq>;
}
export declare class Rabbitmq implements IRabbitmq {
    private readonly rabbitmqConnection;
    private readonly rabbitmqConsumer;
    constructor();
    createConnection(rabbitmqConnectionOptionsBuilder?: (builder: RabbitmqConnectionOptionsBuilder) => void): Promise<IRabbitmq>;
    addConsumer(rabbitmqConsumerOptionsBuilder?: (builder: RabbitmqConsumerOptionsBuilder) => void): Promise<IRabbitmq>;
}
