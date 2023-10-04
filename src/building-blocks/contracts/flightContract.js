"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightStatus = exports.FlightDto = void 0;
class FlightDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.FlightDto = FlightDto;
var FlightStatus;
(function (FlightStatus) {
    FlightStatus[FlightStatus["UNKNOWN"] = 0] = "UNKNOWN";
    FlightStatus[FlightStatus["FLYING"] = 1] = "FLYING";
    FlightStatus[FlightStatus["DELAY"] = 2] = "DELAY";
    FlightStatus[FlightStatus["CANCELED"] = 3] = "CANCELED";
    FlightStatus[FlightStatus["COMPLETED"] = 4] = "COMPLETED";
})(FlightStatus || (exports.FlightStatus = FlightStatus = {}));
//# sourceMappingURL=flightContract.js.map