import winston, { format } from 'winston';
import config from '../config/config';

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    format.timestamp(),
    format.align(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
