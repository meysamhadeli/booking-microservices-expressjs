export declare class OpenTelemetryOptions {
    jaegerEndpoint: string;
    zipkinEndpoint: string;
    serviceName: string;
}
export declare class OpenTelemetryOptionsBuilder {
    private _options;
    jaegerEndpoint(value: string): OpenTelemetryOptionsBuilder;
    zipkinEndpoint(value: string): OpenTelemetryOptionsBuilder;
    serviceName(value: string): OpenTelemetryOptionsBuilder;
    build(): OpenTelemetryOptions;
}
