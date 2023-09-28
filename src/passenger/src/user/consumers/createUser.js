"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserConsumerHandler = void 0;
const passengerRepository_1 = require("../../data/repositories/passengerRepository");
const passenger_1 = require("../../passenger/entities/passenger");
const passengerType_1 = require("../../passenger/enums/passengerType");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("building-blocks/logging/logger");
const createUserConsumerHandler = (queue, message) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    if (message == null || message == undefined)
        return;
    const passengerRepository = new passengerRepository_1.PassengerRepository();
    const passenger = yield passengerRepository.createPassenger(new passenger_1.Passenger({
        name: message.name,
        passportNumber: message.passportNumber,
        age: 20,
        passengerType: passengerType_1.PassengerType.MALE
    }));
    logger.info(`Passenger with name: ${passenger === null || passenger === void 0 ? void 0 : passenger.name} created.`);
});
exports.createUserConsumerHandler = createUserConsumerHandler;
//# sourceMappingURL=createUser.js.map