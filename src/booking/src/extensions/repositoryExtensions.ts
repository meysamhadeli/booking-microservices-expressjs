import { container } from 'tsyringe';
import { BookingRepository, IBookingRepository } from '../data/repositories/bookingRepository';

export const registerRepositories = async (): Promise<void> => {
  container.register<IBookingRepository>('IBookingRepository', BookingRepository);
};
