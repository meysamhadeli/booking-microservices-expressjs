import { Booking } from '../../booking/entities/booking';
export interface IBookingRepository {
    createBooking(booking: Booking): Promise<Booking>;
}
export declare class BookingRepository implements IBookingRepository {
    private ormRepository;
    constructor();
    createBooking(booking: Booking): Promise<Booking>;
}
