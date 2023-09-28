import { Response } from 'express';
import morgan from 'morgan';
import config from '../config/config';
import { container } from 'tsyringe';
import { Logger } from './logger';
morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const morganMiddleware = (req: any, res: any, next: any) => {
  const logger = container.resolve(Logger);
  if (res.statusCode >= 400) {
    morgan(errorResponseFormat, {
      skip: (req, res) => res.statusCode < 400,
      stream: { write: (message) => logger.error(message.trim()) }
    });
    next();
  } else {
    morgan(successResponseFormat, {
      skip: (req, res) => res.statusCode >= 400,
      stream: { write: (message) => logger.info(message.trim()) }
    });
    next();
  }
};
