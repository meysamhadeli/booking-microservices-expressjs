import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/dbContext';
import { Booking } from '../../booking/entities/booking';

export interface IBookingRepository {
  createBooking(booking: Booking): Promise<Booking>;
}

export class BookingRepository implements IBookingRepository {
  private ormRepository: Repository<Booking>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Booking);
  }

  async createBooking(booking: Booking): Promise<Booking> {
    return await this.ormRepository.save(booking);
  }
}
