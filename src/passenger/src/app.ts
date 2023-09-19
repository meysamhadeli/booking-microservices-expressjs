import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import {morganMiddleware} from 'building-blocks/logging/morgan';
import * as swaggerUi from 'swagger-ui-express';
import Logger from 'building-blocks/logging/logger';
import logger from 'building-blocks/logging/logger';
import config from 'building-blocks/config/config';
import {errorHandler} from 'building-blocks/middlewares/errorHandler';
import {initialDataSource} from "./data/dataSource";
import {registerMediatrHandlers} from "./extensions/mediatrExtensions";
import {initialRabbitmq} from "./extensions/rabbitmqExtensions";
import {RegisterRoutes} from "./routes/routes";

const app = express();

const start = async () => {

// request and response logging
    if (config.env !== 'test') {
        app.use(morganMiddleware);
    }

// establish database connection
    await initialDataSource();

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

// error handler
    app.use(errorHandler);

//register swagger
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

// register mediatr handlers
    await registerMediatrHandlers();

// register rabbitmq
    await initialRabbitmq();
}

start();

export default app;


