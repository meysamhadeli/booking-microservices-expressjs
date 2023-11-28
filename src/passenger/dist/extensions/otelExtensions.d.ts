import { OpenTelemetryTracer } from 'building-blocks/openTelemetry/otel';
import { Express } from 'express';
export declare const initialOpenTelemetry: (app?: Express) => Promise<OpenTelemetryTracer>;
