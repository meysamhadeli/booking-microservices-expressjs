import { IDataSeeder } from 'building-blocks/typeorm/dbContext';
import { container } from 'tsyringe';
import { AircraftRepository } from '../repositories/aircraftRepository';
import { AirportRepository } from '../repositories/airportRepository';
import { Airport } from '../../airport/entities/airport';
import { Aircraft } from '../../aircraft/entities/aircraft';
import { FlightRepository } from '../repositories/flightRepository';
import { Flight } from '../../flight/entities/flight';
import { FlightStatus } from '../../flight/enums/flightStatus';

export class FlightSeed implements IDataSeeder {
  public async seedData(): Promise<void> {
    await this.seedAircraft();
    await this.seedAirport();
    await this.seedFlight();
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
}
