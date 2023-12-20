import { RabbitmqConsumerOptions } from './rabbitmq-consumer-options-builder';
export type handlerFunc<T> = (queue: string, message: T) => void;
export interface IConsumer {
    addConsumer<T>(consumerOptions: RabbitmqConsumerOptions): Promise<void>;
    isConsumed<T>(message: T): Promise<boolean>;
}
export declare class Consumer implements IConsumer {
    addConsumer<T>(consumerOptions: RabbitmqConsumerOptions): Promise<void>;
    isConsumed<T>(message: T): Promise<boolean>;
}
