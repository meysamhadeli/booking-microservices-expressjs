"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const tsyringe_1 = require("tsyringe");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const createBooking_1 = require("../booking/features/v1/createBooking/createBooking");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(createBooking_1.CreateBooking, tsyringe_1.container.resolve(createBooking_1.CreateBookingHandler));
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map