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
exports.Seat = void 0;
const flight_1 = require("../../flight/entities/flight");
const typeorm_1 = require("typeorm");
const seatClass_1 = require("../enums/seatClass");
const seatType_1 = require("../enums/seatType");
let Seat = class Seat {
    constructor(partial) {
        var _a;
        Object.assign(this, partial);
        this.createdAt = (_a = partial === null || partial === void 0 ? void 0 : partial.createdAt) !== null && _a !== void 0 ? _a : new Date();
    }
};
exports.Seat = Seat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Seat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seat.prototype, "seatNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: seatClass_1.SeatClass,
        default: seatClass_1.SeatClass.UNKNOWN
    }),
    __metadata("design:type", Number)
], Seat.prototype, "seatClass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: seatType_1.SeatType,
        default: seatType_1.SeatType.UNKNOWN
    }),
    __metadata("design:type", Number)
], Seat.prototype, "seatType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Seat.prototype, "flightId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Seat.prototype, "isReserved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flight_1.Flight, (flight) => flight.seats),
    __metadata("design:type", flight_1.Flight)
], Seat.prototype, "flight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Seat.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Seat.prototype, "updatedAt", void 0);
exports.Seat = Seat = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Seat);
//# sourceMappingURL=seat.js.map