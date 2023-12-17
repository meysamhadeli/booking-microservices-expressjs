import { OpenTelemetryOptions } from './open-telemetry';
export declare class OpenTelemetryOptionsBuilder {
    private _options;
    get jaegerEndpoint(): string;
    set jaegerEndpoint(value: string);
    get zipkinEndpoint(): string;
    set zipkinEndpoint(value: string);
    get serviceName(): string;
    set serviceName(value: string);
    build(): OpenTelemetryOptions;
}
