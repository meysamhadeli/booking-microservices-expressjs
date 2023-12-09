export interface ILogger {
    debug(message: string): void;
    error(message: string | Error): void;
    info(message: string): void;
}
export declare class Logger implements ILogger {
    private logger;
    constructor();
    debug(message: string): void;
    info(message: string): void;
    error(message: string | Error): void;
}
