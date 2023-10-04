"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialHttpClientServices = void 0;
const tsyringe_1 = require("tsyringe");
const flightClientService_1 = require("../booking/httpClient/services/flight/flightClientService");
const passengerClientService_1 = require("../booking/httpClient/services/passenger/passengerClientService");
const initialHttpClientServices = () => {
    tsyringe_1.container.register('IFlightClientService', flightClientService_1.FlightClientService);
    tsyringe_1.container.register('IPassengerClientService', passengerClientService_1.PassengerClientService);
};
exports.initialHttpClientServices = initialHttpClientServices;
//# sourceMappingURL=httpClientExtensions.js.map