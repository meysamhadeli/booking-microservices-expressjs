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
exports.FlightSeed = void 0;
const tsyringe_1 = require("tsyringe");
const aircraftRepository_1 = require("../repositories/aircraftRepository");
const airportRepository_1 = require("../repositories/airportRepository");
const airport_1 = require("../../airport/entities/airport");
const aircraft_1 = require("../../aircraft/entities/aircraft");
const flightRepository_1 = require("../repositories/flightRepository");
const flight_1 = require("../../flight/entities/flight");
const flightStatus_1 = require("../../flight/enums/flightStatus");
class FlightSeed {
    seedData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.seedAircraft();
            yield this.seedAirport();
            yield this.seedFlight();
        });
    }
    seedAircraft() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const aircraftRepository = tsyringe_1.container.resolve(aircraftRepository_1.AircraftRepository);
            if (((_a = (yield aircraftRepository.getAll())) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                yield aircraftRepository.createAircraft(new aircraft_1.Aircraft({
                    id: 1,
                    name: 'airbus',
                    manufacturingYear: 2002,
                    model: '3300'
                }));
            }
        });
    }
    seedAirport() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const airportRepository = tsyringe_1.container.resolve(airportRepository_1.AirportRepository);
            if (((_a = (yield airportRepository.getAll())) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                yield airportRepository.createAirport(new airport_1.Airport({
                    id: 1,
                    name: 'mehrabad',
                    code: '1422',
                    address: 'tehran'
                }));
            }
        });
    }
    seedFlight() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const flightRepository = tsyringe_1.container.resolve(flightRepository_1.FlightRepository);
            if (((_a = (yield flightRepository.getAll())) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                yield flightRepository.createFlight(new flight_1.Flight({
                    id: 1,
                    flightDate: new Date('2023-09-30'),
                    flightStatus: flightStatus_1.FlightStatus.COMPLETED,
                    flightNumber: '1299',
                    aircraftId: 1,
                    price: 800,
                    departureAirportId: 1,
                    departureDate: new Date('2023-09-31'),
                    arriveAirportId: 1,
                    arriveDate: new Date('2023-09-31'),
                    durationMinutes: 1000
                }));
            }
        });
    }
}
exports.FlightSeed = FlightSeed;
//# sourceMappingURL=flightSeed.js.map