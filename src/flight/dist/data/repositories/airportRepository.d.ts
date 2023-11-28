import { Airport } from '../../airport/entities/airport';
export interface IAirportRepository {
    createAirport(airport: Airport): Promise<Airport>;
    findAirportByName(name: string): Promise<Airport>;
    getAll(): Promise<Airport[]>;
}
export declare class AirportRepository implements IAirportRepository {
    private ormRepository;
    constructor();
    createAirport(airport: Airport): Promise<Airport>;
    findAirportByName(name: string): Promise<Airport>;
    getAll(): Promise<Airport[]>;
}
