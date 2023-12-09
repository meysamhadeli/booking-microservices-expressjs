import { Tracer } from '@opentelemetry/sdk-trace-node';
export interface IOpenTelemetryTracer {
    createTracer(tracerName: string): Promise<Tracer>;
}
export declare class OpenTelemetryTracer implements IOpenTelemetryTracer {
    createTracer(tracerName: string): Promise<Tracer>;
}
