"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/db-context");
const booking_1 = require("../../booking/entities/booking");
class BookingRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(booking_1.Booking);
    }
    async createBooking(booking) {
        return await this.ormRepository.save(booking);
    }
}
exports.BookingRepository = BookingRepository;
//# sourceMappingURL=bookingRepository.js.map
