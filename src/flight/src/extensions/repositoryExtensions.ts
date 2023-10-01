import { container } from 'tsyringe';
import { AircraftRepository, IAircraftRepository } from '../data/repositories/aircraftRepository';
import { AirportRepository, IAirportRepository } from '../data/repositories/airportRepository';
import { FlightRepository, IFlightRepository } from '../data/repositories/flightRepository';
import { ISeatRepository, SeatRepository } from '../data/repositories/seatRepository';

export const registerRepositories = async (): Promise<void> => {
  container.register<IAircraftRepository>('IAircraftRepository', AircraftRepository);
  container.register<IAirportRepository>('IAirportRepository', AirportRepository);
  container.register<IFlightRepository>('IFlightRepository', FlightRepository);
  container.register<ISeatRepository>('ISeatRepository', SeatRepository);
};
