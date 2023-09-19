import {Passenger} from "../../passenger/entities/passenger";
import {dataSource} from "../dataSource";

export interface IPassengerRepository {
    createPassenger(passenger: Passenger): Promise<Passenger>;

    findPassengerById(id: number): Promise<Passenger>;

    getAllPassenger(): Promise<Passenger[]>;
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

    async getAllPassenger(): Promise<Passenger[]> {
        const passengerRepository = dataSource.getRepository(Passenger);

        return passengerRepository.find();
    }

}
