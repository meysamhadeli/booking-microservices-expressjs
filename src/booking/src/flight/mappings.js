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
            .map((src) => src.durationMinutes, (dest) => dest.durationMinutes)
            .map((src) => src.flightStatus, (dest) => dest.flightStatus)
            .map((src) => src.id, (dest) => dest.id)
            .map((src) => src.createdAt, (dest) => dest.createdAt)
            .map((src) => src.updatedAt, (dest) => dest.updatedAt)
            .map((src) => src.flightDate, (dest) => dest.flightDate)
            .map((src) => src.arriveDate, (dest) => dest.arriveDate)
            .map((src) => src.arriveAirportId, (dest) => dest.arriveAirportId)
            .map((src) => src.departureDate, (dest) => dest.departureDate)
            .map((src) => src.departureAirportId, (dest) => dest.departureAirportId)
            .map((src) => src.departureAirportId, (dest) => dest.departureAirportId)
            .map((src) => src.price, (dest) => dest.price)
            .map((src) => src.aircraftId, (dest) => dest.aircraftId)
            .map((src) => src.flightNumber, (dest) => dest.flightNumber);
    }
}
exports.Mapper = Mapper;
const mapper = new Mapper();
exports.default = mapper;
//# sourceMappingURL=mappings.js.map