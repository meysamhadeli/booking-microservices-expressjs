export declare class RabbitmqOptions {
    host: string;
    port: number;
    username: string;
    password: string;
}
export declare class RabbitmqOptionsBuilder {
    private _options;
    get host(): string;
    set host(value: string);
    get port(): number;
    set port(value: number);
    get username(): string;
    set username(value: string);
    get password(): string;
    set password(value: string);
    build(): RabbitmqOptions;
}