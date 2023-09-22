import { Express } from 'express';
import Logger from 'building-blocks/logging/logger';
import config from 'building-blocks/config/config';
import {
  requestCounterMiddleware,
  requestDurationMiddleware
} from 'building-blocks/middlewares/metricsMiddleware';
import { register } from 'building-blocks/openTelemetry/metrics';

export const initialMonitoring = async (app: Express): Promise<void> => {
  app.get('/metrics', async (_req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
      Logger.info(`Metrics started on http://localhost:${config.port}/metrics`);
    } catch (err) {
      res.status(500).end(err);
    }
  });

  // metrics for request counter
  app.use(requestCounterMiddleware);

  // metrics for request duration
  app.use(requestDurationMiddleware);
};
