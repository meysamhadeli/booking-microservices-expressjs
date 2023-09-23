import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { morganMiddleware } from 'building-blocks/logging/morgan';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import { initialDatabase } from './data/dataSource';
import Logger from 'building-blocks/logging/logger';
import logger from 'building-blocks/logging/logger';
import config from 'building-blocks/config/config';
import { errorHandler } from 'building-blocks/middlewares/errorHandler';
import { initialRabbitmq } from './extensions/rabbitmqExtensions';
import { registerMediatrHandlers } from './extensions/mediatrExtensions';
import { initialOtel } from './extensions/otelExtensions';
import { initialMonitoring } from './extensions/monitoringExtensions';
import { collectDefaultMetrics } from 'prom-client';
import { registerRepositories } from './extensions/repositoryExtensions';

export const startupApp = async () => {
  collectDefaultMetrics();

  const app = express();

  if (config.env !== 'test') {
    app.use(morganMiddleware);
    await initialMonitoring(app);
  }

  const databaseConnection = await initialDatabase();

  await registerRepositories();

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use(cors());
  app.options('*', cors());

  await initialOtel();

  app.use(passport.initialize());

  RegisterRoutes(app);

  app.use(errorHandler);

  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  const rabbitmq = await initialRabbitmq();

  await registerMediatrHandlers();

  if (config.env !== 'test') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const swaggerDocument = require('./docs/swagger.json');
      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (err) {
      Logger.error('Unable to read swagger.json', err);
    }

    process.on('SIGTERM', async () => {
      await rabbitmq.closeConnection();
      await databaseConnection.destroy();
    });
  }
};

startupApp();
