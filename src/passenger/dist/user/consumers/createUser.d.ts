import { UserCreated } from 'building-blocks/contracts/identityContract';
export declare const createUserConsumerHandler: (queue: string, message: UserCreated) => Promise<void>;
