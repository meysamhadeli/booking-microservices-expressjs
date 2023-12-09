import { container } from 'tsyringe';
import {AircraftRepository, IAircraftRepository} from "../data/repositories/aircraft.repository";
import {AirportRepository, IAirportRepository} from "../data/repositories/airport.repository";
import {FlightRepository, IFlightRepository} from "../data/repositories/flight.repository";
import {ISeatRepository, SeatRepository} from "../data/repositories/seat.repository";

export const registerRepositories = async (): Promise<void> => {
  container.register<IAircraftRepository>('IAircraftRepository', AircraftRepository);
  container.register<IAirportRepository>('IAirportRepository', AirportRepository);
  container.register<IFlightRepository>('IFlightRepository', FlightRepository);
  container.register<ISeatRepository>('ISeatRepository', SeatRepository);
};
