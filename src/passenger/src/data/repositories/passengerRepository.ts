import {Passenger} from "../../passenger/entities/passenger";
import {dataSource} from "../dataSource";
import {SelectQueryBuilder} from "typeorm";

export interface IPassengerRepository {
    createPassenger(passenger: Passenger): Promise<Passenger>;

    findPassengerById(id: number): Promise<Passenger>;

    findPassengers(
        page: number,
        pageSize: number,
        orderBy: string,
        order: 'ASC' | 'DESC',
        searchTerm?: string
    ): Promise<[Passenger[], number]>;
}

export class PassengerRepository implements IPassengerRepository {
    async createPassenger(passenger: Passenger): Promise<Passenger> {
        const passengerRepository = dataSource.getRepository(Passenger);

        return await passengerRepository.save(passenger);
    }

    async findPassengerById(id: number): Promise<Passenger> {
        const passengerRepository = dataSource.getRepository(Passenger);

        return passengerRepository.findOneBy({id: id});
    }

    async findPassengers(
        page: number,
        pageSize: number,
        orderBy: string,
        order: 'ASC' | 'DESC',
        searchTerm?: string
    ): Promise<[Passenger[], number]> {
        const passengerRepository = dataSource.getRepository(Passenger);

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const queryBuilder: SelectQueryBuilder<Passenger> = passengerRepository
            .createQueryBuilder('passenger')
            .orderBy(`passenger.${orderBy}`, order)
            .skip(skip)
            .take(take);

        // Apply filter criteria to the query
        if (searchTerm) {
            queryBuilder.andWhere('passenger.name LIKE :name', {name: `%${searchTerm}%`});
        }

        return await queryBuilder.getManyAndCount();
    }

}
