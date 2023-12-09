import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/db-context';
import {Airport} from "../../airport/entities/airport.entity";

export interface IAirportRepository {
  createAirport(airport: Airport): Promise<Airport>;
  findAirportByName(name: string): Promise<Airport>;
  getAll(): Promise<Airport[]>;
}

export class AirportRepository implements IAirportRepository {
  private ormRepository: Repository<Airport>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Airport);
  }

  async createAirport(airport: Airport): Promise<Airport> {
    return await this.ormRepository.save(airport);
  }

  async findAirportByName(name: string): Promise<Airport> {
    return await this.ormRepository.findOneBy({
      name: name
    });
  }

  async getAll(): Promise<Airport[]> {
    return await this.ormRepository.find();
  }
}
