"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const typeorm_1 = require("typeorm");
const flightStatus_1 = require("../enums/flightStatus");
const airport_1 = require("../../airport/entities/airport");
const aircraft_1 = require("../../aircraft/entities/aircraft");
let Flight = class Flight {
    constructor(partial) {
        var _a;
        Object.assign(this, partial);
        this.createdAt = (_a = partial === null || partial === void 0 ? void 0 : partial.createdAt) !== null && _a !== void 0 ? _a : new Date();
    }
};
exports.Flight = Flight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Flight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "flightNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: flightStatus_1.FlightStatus,
        default: flightStatus_1.FlightStatus.UNKNOWN
    }),
    __metadata("design:type", Number)
], Flight.prototype, "flightStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Flight.prototype, "flightDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Flight.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Flight.prototype, "departureAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Flight.prototype, "aircraftId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Flight.prototype, "arriveDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Flight.prototype, "arriveAirportId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Flight.prototype, "airportId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Flight.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Flight.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Flight.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aircraft_1.Aircraft, (aircraft) => aircraft.flights),
    __metadata("design:type", aircraft_1.Aircraft)
], Flight.prototype, "aircraft", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airport_1.Airport, (airport) => airport.departureFlights),
    __metadata("design:type", airport_1.Airport)
], Flight.prototype, "departureAirport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airport_1.Airport, (airport) => airport.arrivalFlights),
    __metadata("design:type", airport_1.Airport)
], Flight.prototype, "arriveAirport", void 0);
exports.Flight = Flight = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Flight);
//# sourceMappingURL=flight.js.map