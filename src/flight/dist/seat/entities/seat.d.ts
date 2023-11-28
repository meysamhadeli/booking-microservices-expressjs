import { Flight } from '../../flight/entities/flight';
import { SeatClass } from '../enums/seatClass';
import { SeatType } from '../enums/seatType';
export declare class Seat {
    id: number;
    seatNumber: string;
    seatClass: SeatClass;
    seatType: SeatType;
    flightId: number;
    isReserved: boolean;
    flight?: Flight;
    createdAt: Date;
    updatedAt?: Date | null;
    constructor(partial?: Partial<Seat>);
}
