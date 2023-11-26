import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { morganMiddleware } from 'building-blocks/logging/morgan';
import { RegisterRoutes } from './routes/routes';
import config from 'building-blocks/config/config';
import { initialRabbitmq } from './extensions/rabbitmqExtensions';
import { registerMediatrHandlers } from './extensions/mediatrExtensions';
import { initialOpenTelemetry } from './extensions/otelExtensions';
import { collectDefaultMetrics } from 'prom-client';
import { initialDbContext } from './data/dbContext';
import { initialSwagger } from 'building-blocks/swagger/swagger';
import { initialLogger } from './extensions/loggerExtensions';
import { initialHttpClientServices } from './extensions/httpClientExtensions';
import { errorHandler } from 'building-blocks/error-handler/errorHandler';

const startupApp = async () => {
  collectDefaultMetrics();

  const app = express();

  const logger = await initialLogger();

  app.use(morganMiddleware);

  const databaseConnection = await initialDbContext();

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

  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  const rabbitmq = await initialRabbitmq();

  await initialHttpClientServices();

  await registerMediatrHandlers();

  if (config.env == 'development') {
    await initialSwagger(app);
  }

  process.on('SIGTERM', async () => {
    await databaseConnection.destroy();
    await rabbitmq.closeConnection();
  });
};

startupApp();
