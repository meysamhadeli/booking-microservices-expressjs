import { UserCreated } from 'building-blocks/contracts/identity.contract';
export declare const createUserConsumerHandler: (queue: string, message: UserCreated) => Promise<void>;
