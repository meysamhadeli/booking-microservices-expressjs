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
exports.PassengerRepository = void 0;
const passenger_1 = require("../../passenger/entities/passenger");
const dataSource_1 = require("../dataSource");
class PassengerRepository {
    createPassenger(passenger) {
        return __awaiter(this, void 0, void 0, function* () {
            const passengerRepository = dataSource_1.dataSource.getRepository(passenger_1.Passenger);
            return yield passengerRepository.save(passenger);
        });
    }
    findPassengerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const passengerRepository = dataSource_1.dataSource.getRepository(passenger_1.Passenger);
            return passengerRepository.findOneBy({ id: id });
        });
    }
    getAllPassenger() {
        return __awaiter(this, void 0, void 0, function* () {
            const passengerRepository = dataSource_1.dataSource.getRepository(passenger_1.Passenger);
            return passengerRepository.find();
        });
    }
}
exports.PassengerRepository = PassengerRepository;
//# sourceMappingURL=passengerRepository.js.map