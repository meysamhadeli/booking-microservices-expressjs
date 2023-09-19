import {PassengerRepository} from "../../data/repositories/passengerRepository";
import {UserCreated} from "building-blocks/contracts/identityContract";
import {Passenger} from "../../passenger/entities/passenger";
import {PassengerType} from "../../passenger/enums/passengerType";
import logger from "building-blocks/logging/logger";

export const createUserConsumerHandler = async (queue: string, message: UserCreated)=> {
    if (message ?? false) return;

    const passengerRepository = new PassengerRepository();
    const passenger = await passengerRepository.createPassenger(new Passenger(message.name, message.passportNumber, 20, PassengerType.MALE));

    logger.info(`Passenger with name: ${passenger?.name} created.`)
}
