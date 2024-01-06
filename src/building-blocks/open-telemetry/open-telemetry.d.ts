import { Tracer } from '@opentelemetry/sdk-trace-node';
import { OpenTelemetryOptionsBuilder } from './open-telemetry-options-builder';
export interface IOpenTelemetryTracer {
  createTracer(
    openTelemetryOptionsBuilder?: (
      openTelemetryOptionsBuilder?: OpenTelemetryOptionsBuilder
    ) => void
  ): Promise<Tracer>;
}
export declare class OpenTelemetryTracer implements IOpenTelemetryTracer {
  createTracer(
    openTelemetryOptionsBuilder: (openTelemetryOptionsBuilder?: OpenTelemetryOptionsBuilder) => void
  ): Promise<Tracer>;
}
