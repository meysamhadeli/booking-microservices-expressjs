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
exports.registerRepositories = void 0;
const tsyringe_1 = require("tsyringe");
const aircraftRepository_1 = require("../data/repositories/aircraftRepository");
const airportRepository_1 = require("../data/repositories/airportRepository");
const flightRepository_1 = require("../data/repositories/flightRepository");
const seatRepository_1 = require("../data/repositories/seatRepository");
const registerRepositories = () => __awaiter(void 0, void 0, void 0, function* () {
    tsyringe_1.container.register('IAircraftRepository', aircraftRepository_1.AircraftRepository);
    tsyringe_1.container.register('IAirportRepository', airportRepository_1.AirportRepository);
    tsyringe_1.container.register('IFlightRepository', flightRepository_1.FlightRepository);
    tsyringe_1.container.register('ISeatRepository', seatRepository_1.SeatRepository);
});
exports.registerRepositories = registerRepositories;
//# sourceMappingURL=repositoryExtensions.js.map