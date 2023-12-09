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
import { erroHandler } from 'building-blocks/error-handler/erro-handler';
import {initialDbContext} from "./data/db.context";
import {initialLogger} from "./extensions/logger.extensions";
import {initialOpenTelemetry} from "./extensions/otel.extensions";
import {initialRabbitmq} from "./extensions/rabbitmq.extensions";
import {initialHttpClientServices} from "./extensions/http-client.extensions";
import {registerMediatrHandlers} from "./extensions/mediatr.extensions";

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

  app.use(erroHandler);

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
