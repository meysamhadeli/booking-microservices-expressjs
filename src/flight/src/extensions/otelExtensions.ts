import { container } from 'tsyringe';
import { OpenTelemetryTracer } from 'building-blocks/openTelemetry/otel';
import config from 'building-blocks/config/config';
import { Logger } from 'building-blocks/logging/logger';
import { register } from 'building-blocks/openTelemetry/metrics';
import { requestCounterMiddleware, requestDurationMiddleware } from 'building-blocks/middlewares/metricsMiddleware';
import { Express } from 'express';

export const initialOpenTelemetry = async (app?: Express): Promise<OpenTelemetryTracer> => {
  // tracing
  const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
  await openTelemetryTracer.createTracer(config.serviceName);

  // monitoring
  if (app) {
    const logger = container.resolve(Logger);

    app.get('/metrics', async (_req, res) => {
      try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
        logger.info(`Metrics started on http://localhost:${config.port}/metrics`);
      } catch (err) {
        res.status(500).end(err);
      }
    });

    // metrics for request counter
    app.use(requestCounterMiddleware);

    // metrics for request duration
    app.use(requestDurationMiddleware);
  }

  return openTelemetryTracer;
};
