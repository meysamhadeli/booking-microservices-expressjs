import { Token } from '../token.class';
import { Constructable } from '../types/constructable.type';
/**
 * Injects a service into a class property or constructor parameter.
 */
export declare function Inject(): Function;
export declare function Inject(typeFn: (type?: never) => Constructable<unknown>): Function;
export declare function Inject(serviceName?: string): Function;
export declare function Inject(token: Token<unknown>): Function;
