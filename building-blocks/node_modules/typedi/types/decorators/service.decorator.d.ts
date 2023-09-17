import { Token } from '../token.class';
import { ServiceOptions } from '../interfaces/service-options.interface';
/**
 * Marks class as a service that can be injected using Container.
 */
export declare function Service<T = unknown>(): Function;
export declare function Service<T = unknown>(name: string): Function;
export declare function Service<T = unknown>(token: Token<unknown>): Function;
export declare function Service<T = unknown>(options?: ServiceOptions<T>): Function;
