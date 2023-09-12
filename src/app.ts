import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';
import {errorHandler} from './middlewares/error';
import {morganMiddleware} from './config/morgan';
import {RegisterRoutes} from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import {dataSource} from "./data/dataSource";
import Logger from "./config/logger";
import logger from "./config/logger";

const app = express();

// request and response logging
if (config.env !== 'test') {
  app.use(morganMiddleware);
}

// establish database connection
dataSource
  .initialize()
  .then(() => {
    Logger.info("Data Source has been initialized!")

    dataSource.runMigrations().then(() => {
      Logger.info("Migrations run successfully!")
    }).catch((err) => {
      Logger.error("Error during running the Migrations!")
    });

    // run the server
    app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });

  })
  .catch((err) => {
    Logger.error("Error during Data Source initialization:", err)
  })

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());

// register routes with tsoa
RegisterRoutes(app);

// register swagger
try {
  const swaggerDocument = require('./docs/swagger.json');
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  Logger.error('Unable to read swagger.json', err);
}

// handle error
app.use(errorHandler);

export default app;
