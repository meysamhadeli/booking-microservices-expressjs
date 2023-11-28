import { IDataSeeder } from 'building-blocks/typeorm/dbContext';
export declare class FlightSeed implements IDataSeeder {
    seedData(): Promise<void>;
    private seedAircraft;
    private seedAirport;
    private seedFlight;
    private seedSeats;
}
