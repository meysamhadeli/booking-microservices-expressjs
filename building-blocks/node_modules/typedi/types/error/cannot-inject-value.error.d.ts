import { Constructable } from '../types/constructable.type';
/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
export declare class CannotInjectValueError extends Error {
    private target;
    private propertyName;
    name: string;
    get message(): string;
    constructor(target: Constructable<unknown>, propertyName: string);
}
