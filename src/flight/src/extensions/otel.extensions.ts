import { container } from 'tsyringe';
import { Express } from 'express';
import { PrometheusMetrics } from 'building-blocks/monitoring/prometheus.metrics';
import { OtelDiagnosticsProvider } from 'building-blocks/open-telemetry/otel-diagnostics-provider';

export const initialOpenTelemetry = async (app?: Express): Promise<OtelDiagnosticsProvider> => {
  const otelDiagnosticsProvider = container.resolve(OtelDiagnosticsProvider);

  // monitoring
  if (app) {
    PrometheusMetrics.registerMetricsEndpoint(app);
  }

  return otelDiagnosticsProvider;
};
