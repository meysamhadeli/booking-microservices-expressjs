"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRepositories = void 0;
const tsyringe_1 = require("tsyringe");
const bookingRepository_1 = require("../data/repositories/bookingRepository");
const registerRepositories = async () => {
    tsyringe_1.container.register('IBookingRepository', bookingRepository_1.BookingRepository);
};
exports.registerRepositories = registerRepositories;
//# sourceMappingURL=repositoryExtensions.js.map