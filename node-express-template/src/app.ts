import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { morganMiddleware } from 'building-blocks/logging/morgan';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import { dataSource } from './data/dataSource';
import Logger from 'building-blocks/logging/logger';
import logger from 'building-blocks/logging/logger';
import config from 'building-blocks/config/config';
import { errorHandler } from '../../building-blocks/middlewares/errorHandler';
import applicationException from 'building-blocks/types/exception/applicationException';

const app = express();

// request and response logging
if (config.env !== 'test') {
  app.use(morganMiddleware);
}

// establish database connection
dataSource
  .initialize()
  .then(() => {
    Logger.info('Data Source has been initialized!');

    dataSource
      .runMigrations()
      .then(() => {
        Logger.info('Migrations run successfully!');
      })
      .catch((err) => {
        throw new applicationException('Error during running the Migrations!');
      });
  })
  .catch((err) => {
    throw new applicationException('Error during Data Source initialization:', err);
  });

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());

// register routes with tsoa
RegisterRoutes(app);

// error handler
app.use(errorHandler);

// register swagger
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDocument = require('./docs/swagger.json');
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  Logger.error('Unable to read swagger.json', err);
}

// run the server
app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

export default app;
