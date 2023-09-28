import { Express } from 'express';
import config from 'building-blocks/config/config';
import {
  requestCounterMiddleware,
  requestDurationMiddleware
} from 'building-blocks/middlewares/metricsMiddleware';
import { register } from 'building-blocks/openTelemetry/metrics';
import { container } from 'tsyringe';
import { Logger } from 'building-blocks/logging/logger';

export const initialMonitoring = async (app: Express): Promise<void> => {
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
};
