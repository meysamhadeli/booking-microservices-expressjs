"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengerRepository = void 0;
const passenger_1 = require("../../passenger/entities/passenger");
const dbContext_1 = require("building-blocks/typeorm/dbContext");
const tsyringe_1 = require("tsyringe");
class PassengerRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(passenger_1.Passenger);
    }
    async createPassenger(passenger) {
        return await this.ormRepository.save(passenger);
    }
    async findPassengerById(id) {
        return this.ormRepository.findOneBy({ id: id });
    }
    async findPassengers(page, pageSize, orderBy, order, searchTerm) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const queryBuilder = this.ormRepository
            .createQueryBuilder('passenger')
            .orderBy(`passenger.${orderBy}`, order)
            .skip(skip)
            .take(take);
        if (searchTerm) {
            queryBuilder.andWhere('passenger.name LIKE :name', { name: `%${searchTerm}%` });
        }
        return await queryBuilder.getManyAndCount();
    }
}
exports.PassengerRepository = PassengerRepository;
//# sourceMappingURL=passengerRepository.js.map