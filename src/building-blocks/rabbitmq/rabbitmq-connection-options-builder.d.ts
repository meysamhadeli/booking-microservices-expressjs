export declare class RabbitmqConnectionOptions {
    host: string;
    port: number;
    username: string;
    password: string;
}
export declare class RabbitmqConnectionOptionsBuilder {
    private _options;
    host(value: string): RabbitmqConnectionOptionsBuilder;
    port(value: number): RabbitmqConnectionOptionsBuilder;
    username(value: string): RabbitmqConnectionOptionsBuilder;
    password(value: string): RabbitmqConnectionOptionsBuilder;
    build(): RabbitmqConnectionOptions;
}
