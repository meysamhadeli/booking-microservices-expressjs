import { IDataSeeder } from 'building-blocks/typeorm/db-context';
import { container } from 'tsyringe';
import { AircraftRepository } from '../repositories/aircraft.repository';
import { Aircraft } from '../../aircraft/entities/aircraft.entity';
import { AirportRepository } from '../repositories/airport.repository';
import { Airport } from '../../airport/entities/airport.entity';
import { FlightRepository } from '../repositories/flight.repository';
import { FlightStatus } from '../../flight/enums/flight-status.enum';
import { Flight } from '../../flight/entities/flight.entity';
import { SeatRepository } from '../repositories/seat.repository';
import { Seat } from '../../seat/entities/seat.entity';
import { SeatClass } from '../../seat/enums/seat-class.enum';
import { SeatType } from '../../seat/enums/seat-type.enum';
import {Logger} from "building-blocks/logging/logger";

export class FlightSeed implements IDataSeeder {
  public async seedData(): Promise<void> {
    await this.seedAircraft();
    await this.seedAirport();
    await this.seedFlight();
    await this.seedSeats();
  }

  private async seedAircraft(): Promise<void> {
    const aircraftRepository = container.resolve(AircraftRepository);

    if ((await aircraftRepository.getAll())?.length == 0) {
      const aircrafts = [
        new Aircraft({
          id: 1,
          name: 'airbus',
          manufacturingYear: 2008,
          model: '3300'
        }),
        new Aircraft({
          id: 2,
          name: 'fokker',
          manufacturingYear: 2002,
          model: '2200'
        })
      ];

      for (const aircraft of aircrafts) {
        await aircraftRepository.createAircraft(aircraft);
      }

      Logger.info('Seed aircrafts run successfully!');
    }
  }

  private async seedAirport(): Promise<void> {
    const airportRepository = container.resolve(AirportRepository);

    if ((await airportRepository.getAll())?.length == 0) {
      const airports = [
        new Airport({
          id: 1,
          name: 'mehrabad',
          code: '1422',
          address: 'tehran'
        }),
        new Airport({
          id: 2,
          name: 'kish airport',
          code: '1222',
          address: 'kish'
        })
      ];

      for (const airport of airports) {
        await airportRepository.createAirport(airport);
      }
      Logger.info('Seed airports run successfully!');
    }
  }

  private async seedFlight(): Promise<void> {
    const flightRepository = container.resolve(FlightRepository);

    if ((await flightRepository.getAll())?.length == 0) {
      await flightRepository.createFlight(
        new Flight({
          id: 1,
          flightDate: new Date('2023-09-30'),
          flightStatus: FlightStatus.COMPLETED,
          flightNumber: '1299',
          aircraftId: 1,
          price: 800,
          departureAirportId: 1,
          departureDate: new Date('2023-09-31'),
          arriveAirportId: 1,
          arriveDate: new Date('2023-09-31'),
          durationMinutes: 1000
        })
      );
      Logger.info('Seed flights run successfully!');
    }
  }

  private async seedSeats(): Promise<void> {
    const seatRepository = container.resolve(SeatRepository);

    if ((await seatRepository.getAll())?.length == 0) {
      const seats: Seat[] = [
        new Seat({
          flightId: 1,
          seatNumber: '11A',
          seatClass: SeatClass.FIRST_CLASS,
          seatType: SeatType.WINDOW
        }),
        new Seat({
          flightId: 1,
          seatNumber: '12B',
          seatClass: SeatClass.ECONOMY,
          seatType: SeatType.MIDDLE
        })
      ];

      for (const seat of seats) {
        await seatRepository.createSeat(seat);
      }

      Logger.info('Seed seats run successfully!');
    }
  }
}
