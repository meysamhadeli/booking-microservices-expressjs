import winston, { format } from 'winston';
import config from '../config/config';

const alignedWithColorsAndTimeFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: alignedWithColorsAndTimeFormat,
  transports: [new winston.transports.Console()]
});

export default logger;
