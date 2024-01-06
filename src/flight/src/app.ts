import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { morganMiddleware } from 'building-blocks/logging/morgan';
import { RegisterRoutes } from './routes/routes';
import config from 'building-blocks/config/config';
import { collectDefaultMetrics } from 'prom-client';
import { initialSwagger } from 'building-blocks/swagger/swagger';
import { initialLogger } from './extensions/logger.extensions';
import { initialDbContext } from './data/db.context';
import { initialOpenTelemetry } from './extensions/otel.extensions';
import { initialRabbitmq } from './extensions/rabbitmq.extensions';
import { registerMediatrHandlers } from './extensions/mediatr.extensions';
import { httpContextMiddleware } from 'building-blocks/context/context';
import { postgresOptions } from './data/data-source';
import { Logger } from 'building-blocks/logging/logger';
import {errorHandler} from "building-blocks/error-handler/error-handler";

const startupApp = async () => {
  collectDefaultMetrics();

  const app = express();

  app.get('/', function (req, res) {
    res.send(config.serviceName);
  });

  const logger = await initialLogger();

  app.use(httpContextMiddleware);

  app.use(morganMiddleware);

  await initialDbContext(postgresOptions);

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use(cors());
  app.options('*', cors());

  await initialOpenTelemetry(app);

  app.use(passport.initialize());

  RegisterRoutes(app);

  app.use(errorHandler);

  const server = app.listen(config.port, () => {
    logger.info(`Listening http://localhost:${config.port}`);
  });

  await initialRabbitmq();

  await registerMediatrHandlers();

  if (config.env == 'development') {
    await initialSwagger(app);
  }

  process.on('SIGINT', async () => {
    server.close();
    Logger.info('Application shutdown gracefully.');
  });
};

startupApp();
