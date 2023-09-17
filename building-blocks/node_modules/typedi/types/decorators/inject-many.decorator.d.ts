import { Token } from '../token.class';
/**
 * Injects a list of services into a class property or constructor parameter.
 */
export declare function InjectMany(): Function;
export declare function InjectMany(type?: (type?: any) => Function): Function;
export declare function InjectMany(serviceName?: string): Function;
export declare function InjectMany(token: Token<any>): Function;
