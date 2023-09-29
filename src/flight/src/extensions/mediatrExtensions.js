"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const tsyringe_1 = require("tsyringe");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const createFlight_1 = require("../flight/features/v1/createFlight/createFlight");
const getFlightByNumber_1 = require("../flight/features/v1/getFlightByNumber/getFlightByNumber");
const createAircraft_1 = require("../aircraft/features/v1/createAircraft/createAircraft");
const createAirport_1 = require("../airport/features/v1/createAirport/createAirport");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(createAircraft_1.CreateAircraft, tsyringe_1.container.resolve(createAircraft_1.CreateAircraftHandler));
    mediatr_js_1.mediatrJs.registerHandler(createAirport_1.CreateAirport, tsyringe_1.container.resolve(createAirport_1.CreateAirportHandler));
    mediatr_js_1.mediatrJs.registerHandler(createFlight_1.CreateFlight, tsyringe_1.container.resolve(createFlight_1.CreateFlightHandler));
    mediatr_js_1.mediatrJs.registerHandler(getFlightByNumber_1.GetFlightByNumber, tsyringe_1.container.resolve(getFlightByNumber_1.GetFlightByNumberHandler));
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map