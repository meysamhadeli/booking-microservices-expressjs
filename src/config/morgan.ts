import { Response } from 'express';
import morgan from 'morgan';
import config from './config';
import logger from './logger';

// Define your Morgan token for the message
morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

// Define the IP format function
const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');

// Define success and error response formats
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Create Morgan middleware for success and error logging
const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
});

export const morganMiddleware = (req: any, res: any, next: any) => {
  if (res.statusCode >= 400) {
    errorHandler(req, res, next);
  } else {
    successHandler(req, res, next);
  }
};
