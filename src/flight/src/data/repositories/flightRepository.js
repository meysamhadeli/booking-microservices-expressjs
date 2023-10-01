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
exports.FlightRepository = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/dbContext");
const flight_1 = require("../../flight/entities/flight");
class FlightRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(flight_1.Flight);
    }
    createFlight(flight) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.save(flight);
        });
    }
    findFlightByNumber(flightNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.findOneBy({
                flightNumber: flightNumber
            });
        });
    }
    findFlightById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.findOneBy({
                id: id
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.find();
        });
    }
}
exports.FlightRepository = FlightRepository;
//# sourceMappingURL=flightRepository.js.map