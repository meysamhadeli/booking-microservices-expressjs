import { Request, Response } from 'express';
import * as Prometheus from 'prom-client';
import { requestCounterMiddleware } from './request-counter.middleware';
import { requestDurationMiddleware } from './request-duration.middleware';
import { Logger } from '../logging/logger';
import { container, injectable } from 'tsyringe';

@injectable()
export class PrometheusMetrics {
  static registerMetricsEndpoint(app: any) {
    const logger = container.resolve(Logger);

    app.use('/metrics', async (req: Request, res: Response) => {
      try {
        const metrics = await Prometheus.register.metrics();
        res.set('Content-Type', Prometheus.register.contentType);
        res.end(metrics);
      } catch (error) {
        logger.error(error);
        res.status(500).end();
      }
    });

    // register metrics
    app.use(requestCounterMiddleware);
    app.use(requestDurationMiddleware);
  }
}
