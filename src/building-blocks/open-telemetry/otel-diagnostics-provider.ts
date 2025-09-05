import {
  Context,
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  Meter,
  Span,
  Tracer
} from '@opentelemetry/api';
import { Logger, logs as api_logs } from '@opentelemetry/api-logs';

import opentelemetry from '@opentelemetry/api';
import config from '../config/config';
import { injectable } from 'tsyringe';

@injectable()
export class OtelDiagnosticsProvider {
  getInstrumentationName(): string {
    return config.opentelemetry?.serviceName || 'default-service';
  }

  getTracer(): Tracer {
    return opentelemetry.trace.getTracer(
      config.opentelemetry?.serviceName || 'default-service',
      config.opentelemetry?.serviceVersion || '1.0.0'
    );
  }

  getMeter(): Meter {
    return opentelemetry.metrics.getMeter(
      config.opentelemetry?.serviceName || 'default-service',
      config.opentelemetry?.serviceVersion || '1.0.0'
    );
  }

  getLogger(): Logger {
    return api_logs.getLogger(
      config.opentelemetry?.serviceName || 'default-service',
      config.opentelemetry?.serviceVersion || '1.0.0'
    );
  }

  getCurrentSpan(): Span | undefined {
    return opentelemetry.trace.getActiveSpan();
  }

  getSpanFromContext(ctx: Context): Span | undefined {
    return opentelemetry.trace.getSpan(ctx);
  }
}
