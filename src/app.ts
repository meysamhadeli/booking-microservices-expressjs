import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import config from './config/config';
import { jwtStrategy } from './config/passport';
import { errorHandler } from './middlewares/error';
import { morganMiddleware } from './config/morgan';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';

const app = express();

// request and response logging
if (config.env !== 'test') {
  app.use(morganMiddleware);
}

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
passport.use('jwt', jwtStrategy);

// // v1 api routes
// app.use('/v1', routes);

RegisterRoutes(app);

try {
  const swaggerDocument = require('./docs/swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.error('Unable to read swagger.json', err);
}

// handle error
app.use(errorHandler);

export default app;
