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
exports.Airport = void 0;
const typeorm_1 = require("typeorm");
const flight_1 = require("../../flight/entities/flight");
let Airport = class Airport {
    constructor(partial) {
        var _a;
        Object.assign(this, partial);
        this.createdAt = (_a = partial === null || partial === void 0 ? void 0 : partial.createdAt) !== null && _a !== void 0 ? _a : new Date();
    }
};
exports.Airport = Airport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Airport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Airport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flight_1.Flight, (flight) => flight.departureAirport),
    __metadata("design:type", Array)
], Airport.prototype, "departureFlights", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flight_1.Flight, (flight) => flight.arriveAirport),
    __metadata("design:type", Array)
], Airport.prototype, "arrivalFlights", void 0);
exports.Airport = Airport = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Airport);
//# sourceMappingURL=airport.js.map