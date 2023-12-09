import { UserCreated } from 'building-blocks/contracts/identity.contract';
import { container } from 'tsyringe';
import { Logger } from 'building-blocks/logging/logger';
import {PassengerRepository} from "../../data/repositories/passenger.repository";
import {Passenger} from "../../passenger/entities/passenger.entity";
import {PassengerType} from "../../passenger/enums/passenger-type.enum";

export const createUserConsumerHandler = async (queue: string, message: UserCreated) => {
  const logger = container.resolve(Logger);

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
