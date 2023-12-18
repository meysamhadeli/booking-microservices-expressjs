type handlerFunc<T> = (queue: string, message: T) => void;
export interface IConsumer {
    consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
    isConsumed<T>(message: T): Promise<boolean>;
}
export declare class Consumer implements IConsumer {
    consumeMessage<T>(type: T, handler: handlerFunc<T>): Promise<void>;
    isConsumed<T>(message: T): Promise<boolean>;
}
export {};
