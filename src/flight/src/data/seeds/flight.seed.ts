import { IDataSeeder } from 'building-blocks/typeorm/db-context';
import { container } from 'tsyringe';
import {AircraftRepository} from "../repositories/aircraft.repository";
import {Aircraft} from "../../aircraft/entities/aircraft.entity";
import {AirportRepository} from "../repositories/airport.repository";
import {Airport} from "../../airport/entities/airport.entity";
import {FlightRepository} from "../repositories/flight.repository";
import {Flight} from "../../flight/entities/flight.entity";
import {FlightStatus} from "../../flight/enums/flight-status.enum";
import {SeatRepository} from "../repositories/seat.repository";
import {Seat} from "../../seat/entities/seat.entity";
import {SeatClass} from "../../seat/enums/seat-class.enum";
import {SeatType} from "../../seat/enums/seat-type.enum";

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
