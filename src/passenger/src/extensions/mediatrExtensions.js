"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const getPassengerById_1 = require("../passenger/features/v1/getPassengerById");
const getAllPassengers_1 = require("../passenger/features/v1/getAllPassengers");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(getPassengerById_1.GetPassengerById, new getPassengerById_1.GetPassengerByIdHandler());
    mediatr_js_1.mediatrJs.registerHandler(getAllPassengers_1.GetAllPassenger, new getAllPassengers_1.GetAllPassengerHandler());
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map