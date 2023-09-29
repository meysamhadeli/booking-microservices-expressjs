import { UserCreated } from 'building-blocks/contracts/identityContract';
import { Logger } from 'building-blocks/logging/logger';
import { serializeObject } from 'building-blocks/utils/serialization';
import { container } from 'tsyringe';

export const createUserConsumerHandler = async (queue: string, message: UserCreated) => {
  const logger = container.resolve(Logger);

  if (message == null || message == undefined) return;

  //todo: add some functionality for save write model to read database like mongo

  logger.info(`We received message: ${serializeObject(message)} in user consumers`);
};