"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserConsumerHandler = void 0;
const passengerRepository_1 = require("../../data/repositories/passengerRepository");
const passenger_1 = require("../../passenger/entities/passenger");
const passengerType_1 = require("../../passenger/enums/passengerType");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("building-blocks/logging/logger");
const createUserConsumerHandler = async (queue, message) => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    if (message == null || message == undefined)
        return;
    const passengerRepository = new passengerRepository_1.PassengerRepository();
    const passenger = await passengerRepository.createPassenger(new passenger_1.Passenger({
        name: message.name,
        passportNumber: message.passportNumber,
        age: 20,
        passengerType: passengerType_1.PassengerType.MALE
    }));
    logger.info(`Passenger with name: ${passenger === null || passenger === void 0 ? void 0 : passenger.name} created.`);
};
exports.createUserConsumerHandler = createUserConsumerHandler;
//# sourceMappingURL=createUser.js.map