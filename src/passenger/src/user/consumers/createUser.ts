import { PassengerRepository } from '../../data/repositories/passengerRepository';
import { UserCreated } from 'building-blocks/contracts/identityContract';
import { Passenger } from '../../passenger/entities/passenger';
import { PassengerType } from '../../passenger/enums/passengerType';
import logger from 'building-blocks/logging/logger';

export const createUserConsumerHandler = async (queue: string, message: UserCreated) => {
  if (message == null || message == undefined) return;

  const passengerRepository = new PassengerRepository();
  const passenger = await passengerRepository.createPassenger(
    new Passenger({
      name: message.name,
      passportNumber: message.passportNumber,
      age: 20,
      passengerType: PassengerType.MALE
    })
  );

  logger.info(`Passenger with name: ${passenger?.name} created.`);
};
