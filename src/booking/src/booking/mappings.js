"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
const ts_mapper_1 = require("ts-mapper");
class Mapper extends ts_mapper_1.TypeMapper {
    constructor() {
        super();
        this.config();
    }
    config() {
        this.createMap()
            .map((src) => src.id, (dest) => dest.id)
            .map((src) => src.createdAt, (dest) => dest.createdAt)
            .map((src) => src === null || src === void 0 ? void 0 : src.updatedAt, (dest) => dest === null || dest === void 0 ? void 0 : dest.updatedAt)
            .map((src) => src.aircraftId, (dest) => dest.aircraftId)
            .map((src) => src.arriveAirportId, (dest) => dest.arriveAirportId)
            .map((src) => src.departureAirportId, (dest) => dest.departureAirportId)
            .map((src) => src.flightDate, (dest) => dest.flightDate)
            .map((src) => src.description, (dest) => dest.description)
            .map((src) => src.flightNumber, (dest) => dest.flightNumber)
            .map((src) => src.passengerName, (dest) => dest.passengerName)
            .map((src) => src.price, (dest) => dest.price)
            .map((src) => src.seatNumber, (dest) => dest.seatNumber);
    }
}
exports.Mapper = Mapper;
const mapper = new Mapper();
exports.default = mapper;
//# sourceMappingURL=mappings.js.map