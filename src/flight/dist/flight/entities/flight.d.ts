import { FlightStatus } from '../enums/flightStatus';
import { Airport } from '../../airport/entities/airport';
import { Aircraft } from '../../aircraft/entities/aircraft';
import { Seat } from '../../seat/entities/seat';
export declare class Flight {
    id: number;
    flightNumber: string;
    price: number;
    flightStatus: FlightStatus;
    flightDate: Date;
    departureDate: Date;
    departureAirportId: number;
    aircraftId: number;
    arriveDate: Date;
    arriveAirportId: number;
    durationMinutes: number;
    createdAt: Date;
    updatedAt?: Date | null;
    aircraft?: Aircraft;
    departureAirport?: Airport;
    arriveAirport?: Airport;
    seats: Seat[];
    constructor(partial?: Partial<Flight>);
}
