"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatRepository = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/db-context");
const seat_1 = require("../../seat/entities/seat");
class SeatRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(seat_1.Seat);
    }
    createSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.save(seat);
        });
    }
    reserveSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.save(seat);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.find();
        });
    }
    getAvailableSeat(flightId, seatNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const seat = yield this.ormRepository
                .createQueryBuilder('seat')
                .leftJoinAndSelect('seat.flight', 'flight')
                .where('flight.id = :flightId', { flightId })
                .andWhere('seat.seatNumber = :seatNumber', { seatNumber })
                .andWhere('seat.isReserved = false')
                .getOne();
            return seat;
        });
    }
    getSeatsByFlightId(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.ormRepository
                .createQueryBuilder('seat')
                .leftJoinAndSelect('seat.flight', 'flight')
                .where('flight.id = :flightId', { flightId })
                .andWhere('seat.isReserved = false')
                .getMany();
            return list;
        });
    }
}
exports.SeatRepository = SeatRepository;
//# sourceMappingURL=seatRepository.js.map
