"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const tsyringe_1 = require("tsyringe");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const createFlight_1 = require("../flight/features/v1/createFlight/createFlight");
const createAircraft_1 = require("../aircraft/features/v1/createAircraft/createAircraft");
const createAirport_1 = require("../airport/features/v1/createAirport/createAirport");
const createSeat_1 = require("../seat/features/v1/createSeat/createSeat");
const reserveSeat_1 = require("../seat/features/v1/reserveSeat/reserveSeat");
const getAvailableSeats_1 = require("../seat/features/v1/getAvailableSeats/getAvailableSeats");
const getFlightById_1 = require("../flight/features/v1/getFlightById/getFlightById");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(createAircraft_1.CreateAircraft, tsyringe_1.container.resolve(createAircraft_1.CreateAircraftHandler));
    mediatr_js_1.mediatrJs.registerHandler(createAirport_1.CreateAirport, tsyringe_1.container.resolve(createAirport_1.CreateAirportHandler));
    mediatr_js_1.mediatrJs.registerHandler(createFlight_1.CreateFlight, tsyringe_1.container.resolve(createFlight_1.CreateFlightHandler));
    mediatr_js_1.mediatrJs.registerHandler(getFlightById_1.GetFlightById, tsyringe_1.container.resolve(getFlightById_1.GetFlightByIdHandler));
    mediatr_js_1.mediatrJs.registerHandler(createSeat_1.CreateSeat, tsyringe_1.container.resolve(createSeat_1.CreateSeatHandler));
    mediatr_js_1.mediatrJs.registerHandler(reserveSeat_1.ReserveSeat, tsyringe_1.container.resolve(reserveSeat_1.ReserveSeatHandler));
    mediatr_js_1.mediatrJs.registerHandler(getAvailableSeats_1.GetAvailableSeats, tsyringe_1.container.resolve(getAvailableSeats_1.GetAvailableSeatsHandler));
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map