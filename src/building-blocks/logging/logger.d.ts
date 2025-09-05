export interface ILogger {
    debug(message: string, ...meta: any[]): void;
    error(message: string | Error, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    verbose(message: string, ...meta: any[]): void;
}
export declare class Logger implements ILogger {
    private static logger;
    constructor();
    static debug(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
    static info(message: string, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    static warn(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    static error(message: string | Error, ...meta: any[]): void;
    error(message: string | Error, ...meta: any[]): void;
    static verbose(message: string, ...meta: any[]): void;
    verbose(message: string, ...meta: any[]): void;
    private static formatError;
    private static emit;
}
