import { container } from 'tsyringe';
import { Express } from 'express';
import { PrometheusMetrics } from 'building-blocks/monitoring/prometheus.metrics';
import { OpenTelemetryTracer } from 'building-blocks/open-telemetry/open-telemetry';
import config from 'building-blocks/config/config';

export const initialOpenTelemetry = async (app?: Express): Promise<OpenTelemetryTracer> => {
  // tracing
  const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
  await openTelemetryTracer.createTracer((builder) => {
    builder.serviceName(config?.serviceName);
  });

  // monitoring
  if (app) {
    PrometheusMetrics.registerMetricsEndpoint(app);
  }

  return openTelemetryTracer;
};
