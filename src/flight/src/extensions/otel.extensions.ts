import { container } from 'tsyringe';
import config from 'building-blocks/config/config';
import { Express } from 'express';
import { PrometheusMetrics } from 'building-blocks/monitoring/prometheus.metrics';
import {OpenTelemetryTracer} from "building-blocks/open-telemetry/open-telemetry";

export const initialOpenTelemetry = async (app?: Express): Promise<OpenTelemetryTracer> => {
  // tracing
  const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
  await openTelemetryTracer.createTracer((x) => x.serviceName == x.serviceName);

  // monitoring
  if (app) {
    PrometheusMetrics.registerMetricsEndpoint(app);
  }

  return openTelemetryTracer;
};
