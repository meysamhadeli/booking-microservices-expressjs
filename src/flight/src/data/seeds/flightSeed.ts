import { IDataSeeder } from 'building-blocks/typeorm/dbContext';
import { container } from 'tsyringe';
import { AircraftRepository } from '../repositories/aircraftRepository';
import { AirportRepository } from '../repositories/airportRepository';
import { Airport } from '../../airport/entities/airport';
import { Aircraft } from '../../aircraft/entities/aircraft';
import { FlightRepository } from '../repositories/flightRepository';
import { Flight } from '../../flight/entities/flight';
import { FlightStatus } from '../../flight/enums/flightStatus';
import { SeatRepository } from '../repositories/seatRepository';
import { Seat } from '../../seat/entities/seat';
import { SeatClass } from '../../seat/enums/seatClass';
import { SeatType } from '../../seat/enums/seatType';

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
      await aircraftRepository.createAircraft(
        new Aircraft({
          id: 1,
          name: 'airbus',
          manufacturingYear: 2002,
          model: '3300'
        })
      );
    }
  }

  private async seedAirport(): Promise<void> {
    const airportRepository = container.resolve(AirportRepository);

    if ((await airportRepository.getAll())?.length == 0) {
      await airportRepository.createAirport(
        new Airport({
          id: 1,
          name: 'mehrabad',
          code: '1422',
          address: 'tehran'
        })
      );
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
    }
  }
}
