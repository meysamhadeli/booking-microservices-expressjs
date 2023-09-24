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
exports.PassengerRepository = void 0;
const passenger_1 = require("../../passenger/entities/passenger");
const dbContext_1 = require("building-blocks/typeorm/dbContext");
const tsyringe_1 = require("tsyringe");
class PassengerRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(passenger_1.Passenger);
    }
    createPassenger(passenger) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.save(passenger);
        });
    }
    findPassengerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ormRepository.findOneBy({ id: id });
        });
    }
    findPassengers(page, pageSize, orderBy, order, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const queryBuilder = this.ormRepository
                .createQueryBuilder('passenger')
                .orderBy(`passenger.${orderBy}`, order)
                .skip(skip)
                .take(take);
            // Apply filter criteria to the query
            if (searchTerm) {
                queryBuilder.andWhere('passenger.name LIKE :name', { name: `%${searchTerm}%` });
            }
            return yield queryBuilder.getManyAndCount();
        });
    }
}
exports.PassengerRepository = PassengerRepository;
//# sourceMappingURL=passengerRepository.js.map