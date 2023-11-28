import { Seat } from '../../seat/entities/seat';
export interface ISeatRepository {
    createSeat(seat: Seat): Promise<Seat>;
    reserveSeat(seat: Seat): Promise<Seat>;
    getAll(): Promise<Seat[]>;
    getAvailableSeat(flightId: number, seatNumber: string): Promise<Seat>;
    getSeatsByFlightId(flightId: number): Promise<Seat[]>;
}
export declare class SeatRepository implements ISeatRepository {
    private ormRepository;
    constructor();
    createSeat(seat: Seat): Promise<Seat>;
    reserveSeat(seat: Seat): Promise<Seat>;
    getAll(): Promise<Seat[]>;
    getAvailableSeat(flightId: number, seatNumber: string): Promise<Seat>;
    getSeatsByFlightId(flightId: number): Promise<Seat[]>;
}
