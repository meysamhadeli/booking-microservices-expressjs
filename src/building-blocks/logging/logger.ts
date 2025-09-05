import winston, { format } from 'winston';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { logs } from '@opentelemetry/api-logs';
import config from '../config/config';
import { injectable } from 'tsyringe';

export interface ILogger {
  debug(message: string, ...meta: any[]): void;
  error(message: string | Error, ...meta: any[]): void;
  info(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  verbose(message: string, ...meta: any[]): void;
}

@injectable()
export class Logger implements ILogger {
  private static logger: winston.Logger;

  constructor() {
    Logger.logger = winston.createLogger({
      level: config.env === 'development' ? 'debug' : 'info',
      format: format.combine(
        format.colorize(),
        format.errors({ stack: true }),
        format.timestamp(),
        format.align(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [new winston.transports.Console()]
    });
  }

  // Winston only
  public static debug(message: string, ...meta: any[]): void {
    Logger.logger.debug(message, ...meta);
    this.emit(SeverityNumber.DEBUG, 'DEBUG', message, meta);
  }

  public debug(message: string, ...meta: any[]): void {
    Logger.logger.debug(message, ...meta);
    Logger.emit(SeverityNumber.DEBUG, 'DEBUG', message, meta);
  }

  public static info(message: string, ...meta: any[]): void {
    Logger.logger.info(message, ...meta);
    Logger.emit(SeverityNumber.INFO, 'INFO', message, meta);
  }

  public info(message: string, ...meta: any[]): void {
    Logger.logger.info(message, ...meta);
    Logger.emit(SeverityNumber.INFO, 'INFO', message, meta);
  }

  public static warn(message: string, ...meta: any[]): void {
    Logger.logger.warn(message, ...meta);
    Logger.emit(SeverityNumber.WARN, 'WARN', message, meta);
  }

  public warn(message: string, ...meta: any[]): void {
    Logger.logger.warn(message, ...meta);
    Logger.emit(SeverityNumber.WARN, 'WARN', message, meta);
  }

  public static error(message: string | Error, ...meta: any[]): void {
    const { errorMessage, fullMessage } = this.formatError(message);
    Logger.logger.error(errorMessage, ...meta);
    Logger.emit(SeverityNumber.ERROR, 'ERROR', fullMessage, meta);
  }

  public error(message: string | Error, ...meta: any[]): void {
    const { errorMessage, fullMessage } = Logger.formatError(message);
    Logger.logger.error(errorMessage, ...meta);
    Logger.emit(SeverityNumber.ERROR, 'ERROR', fullMessage, meta);
  }

  public static verbose(message: string, ...meta: any[]): void {
    Logger.logger.verbose(message, ...meta);
    Logger.emit(SeverityNumber.TRACE, 'VERBOSE', message, meta);
  }

  public verbose(message: string, ...meta: any[]): void {
    Logger.logger.verbose(message, ...meta);
    Logger.emit(SeverityNumber.TRACE, 'VERBOSE', message, meta);
  }


  private static formatError(message: string | Error) {
    const errorMessage = message instanceof Error ? message.message : message;
    const stack = message instanceof Error ? message.stack : undefined;
    const fullMessage = stack
      ? `${errorMessage}\n${stack}`
      : errorMessage;
    return { errorMessage, fullMessage };
  }

  private static emit(
    severityNumber: SeverityNumber,
    severityText: string,
    message: string,
    meta: any[] = []
  ): void {
    try {
      const loggerProvider = logs.getLoggerProvider();
      if (!loggerProvider) {
        Logger.logger.warn('OpenTelemetry logger provider not initialized');
        return;
      }

      const logger = logs.getLogger(
        config.opentelemetry?.serviceName || 'default-service',
        config.opentelemetry?.serviceVersion || '1.0.0'
      );

      // Safe string conversion
      let formattedMessage = String(message);
      if (meta && meta.length > 0) {
        formattedMessage +=
          ' ' +
          meta
            .map((param) =>
              param === null || param === undefined
                ? 'null'
                : typeof param === 'object'
                  ? JSON.stringify(param)
                  : String(param)
            )
            .join(' ');
      }

      // Structured meta as attributes
      const attributes = meta.reduce((attrs, param, idx) => {
        if (param === null || param === undefined) {
          attrs[`meta_${idx}`] = 'null';
        } else if (typeof param === 'object') {
          attrs[`meta_${idx}`] = JSON.stringify(param);
        } else {
          attrs[`meta_${idx}`] = String(param);
        }
        return attrs;
      }, {} as Record<string, string>);

      logger.emit({
        severityNumber,
        severityText,
        body: formattedMessage,
        attributes
      });
    } catch (error) {
      Logger.logger.error('OpenTelemetry log emission failed:', error);
    }
  }
}
