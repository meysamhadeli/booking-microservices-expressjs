"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const tsyringe_1 = require("tsyringe");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const getPassengerById_1 = require("../passenger/features/v1/getPassengerById");
const getPassengers_1 = require("../passenger/features/v1/getPassengers");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(getPassengerById_1.GetPassengerById, tsyringe_1.container.resolve(getPassengerById_1.GetPassengerByIdHandler));
    mediatr_js_1.mediatrJs.registerHandler(getPassengers_1.GetPassengers, tsyringe_1.container.resolve(getPassengers_1.GetPassengersHandler));
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map