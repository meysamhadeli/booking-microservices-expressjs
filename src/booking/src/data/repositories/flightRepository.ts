import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/dbContext';
import { Flight } from '../../flight/entities/flight';

export interface IFlightRepository {
  createFlight(flight: Flight): Promise<Flight>;
  findFlightByNumber(flightNumber: string): Promise<Flight>;
  getAll(): Promise<Flight[]>;
}

export class FlightRepository implements IFlightRepository {
  private ormRepository: Repository<Flight>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Flight);
  }

  async createFlight(flight: Flight): Promise<Flight> {
    return await this.ormRepository.save(flight);
  }

  async findFlightByNumber(flightNumber: string): Promise<Flight> {
    return await this.ormRepository.findOneBy({
      flightNumber: flightNumber
    });
  }

  async getAll(): Promise<Flight[]> {
    return await this.ormRepository.find();
  }
}
