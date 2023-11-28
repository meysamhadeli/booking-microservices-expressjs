import { Passenger } from '../../passenger/entities/passenger';
export interface IPassengerRepository {
    createPassenger(passenger: Passenger): Promise<Passenger>;
    findPassengerById(id: number): Promise<Passenger>;
    findPassengers(page: number, pageSize: number, orderBy: string, order: 'ASC' | 'DESC', searchTerm?: string): Promise<[Passenger[], number]>;
}
export declare class PassengerRepository implements IPassengerRepository {
    private ormRepository;
    constructor();
    createPassenger(passenger: Passenger): Promise<Passenger>;
    findPassengerById(id: number): Promise<Passenger>;
    findPassengers(page: number, pageSize: number, orderBy: string, order: 'ASC' | 'DESC', searchTerm?: string): Promise<[Passenger[], number]>;
}
