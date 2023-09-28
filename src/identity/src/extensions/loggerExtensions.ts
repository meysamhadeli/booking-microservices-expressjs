import { ILogger, Logger } from 'building-blocks/logging/logger';
import { container } from 'tsyringe';

export const initialLogger = async (): Promise<Logger> => {
  const logger = container.resolve(Logger);

  container.registerSingleton<ILogger>('ILogger', Logger);

  return logger;
};
