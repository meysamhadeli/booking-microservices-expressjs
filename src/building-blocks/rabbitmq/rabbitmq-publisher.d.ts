import { Logger } from '../logging/logger';
export interface IPublisher {
    publishMessage<T>(message: T): Promise<void>;
    isPublished<T>(message: T): Promise<boolean>;
}
export declare class Publisher implements IPublisher {
    logger: Logger;
    publishMessage<T>(message: T): Promise<void>;
    isPublished<T>(message: T): Promise<boolean>;
}
