import { Flight } from '../../flight/entities/flight';
export declare class Airport {
    id: number;
    name: string;
    address: string;
    code: string;
    createdAt: Date;
    updatedAt?: Date | null;
    departureFlights: Flight[];
    arrivalFlights: Flight[];
    constructor(partial?: Partial<Airport>);
}
