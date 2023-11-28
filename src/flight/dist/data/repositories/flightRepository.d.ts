import { Flight } from '../../flight/entities/flight';
export interface IFlightRepository {
    createFlight(flight: Flight): Promise<Flight>;
    findFlightByNumber(flightNumber: string): Promise<Flight>;
    findFlightById(id: number): Promise<Flight>;
    getAll(): Promise<Flight[]>;
}
export declare class FlightRepository implements IFlightRepository {
    private ormRepository;
    constructor();
    createFlight(flight: Flight): Promise<Flight>;
    findFlightByNumber(flightNumber: string): Promise<Flight>;
    findFlightById(id: number): Promise<Flight>;
    getAll(): Promise<Flight[]>;
}
