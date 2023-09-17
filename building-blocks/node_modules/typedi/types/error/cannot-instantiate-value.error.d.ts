import { ServiceIdentifier } from '../types/service-identifier.type';
/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
export declare class CannotInstantiateValueError extends Error {
    name: string;
    /** Normalized identifier name used in the error message. */
    private normalizedIdentifier;
    get message(): string;
    constructor(identifier: ServiceIdentifier);
}
