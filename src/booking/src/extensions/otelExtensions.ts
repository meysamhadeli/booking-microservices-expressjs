import { container } from 'tsyringe';
import { OpenTelemetryTracer } from 'building-blocks/openTelemetry/otel';
import config from 'building-blocks/config/config';
import { Express } from 'express';
import { PrometheusMetrics } from 'building-blocks/monitoring/prometheus.metrics';

export const initialOpenTelemetry = async (app?: Express): Promise<OpenTelemetryTracer> => {
  // tracing
  const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
  await openTelemetryTracer.createTracer(config.serviceName);

  // monitoring
  if (app) {
    PrometheusMetrics.registerMetricsEndpoint(app);
  }

  return openTelemetryTracer;
};
