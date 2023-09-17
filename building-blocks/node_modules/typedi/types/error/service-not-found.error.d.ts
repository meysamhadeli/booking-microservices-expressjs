import { ServiceIdentifier } from '../types/service-identifier.type';
/**
 * Thrown when requested service was not found.
 */
export declare class ServiceNotFoundError extends Error {
    name: string;
    /** Normalized identifier name used in the error message. */
    private normalizedIdentifier;
    get message(): string;
    constructor(identifier: ServiceIdentifier);
}
