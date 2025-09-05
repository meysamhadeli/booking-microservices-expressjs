export declare class BookingCreated {
    id: number;
    flightNumber: string;
    aircraftId: number;
    departureAirportId: number;
    arriveAirportId: number;
    flightDate: Date;
    price: number;
    description: string;
    seatNumber: string;
    passengerName: string;
    createdAt: Date;
    updatedAt?: Date | null;
    constructor(partial?: Partial<BookingCreated>);
}
