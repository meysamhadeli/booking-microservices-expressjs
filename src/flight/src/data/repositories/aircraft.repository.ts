import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/db-context';
import {Aircraft} from "../../aircraft/entities/aircraft.entity";

export interface IAircraftRepository {
  createAircraft(aircraft: Aircraft): Promise<Aircraft>;

  findAircraftByName(name: string): Promise<Aircraft>;

  getAll(): Promise<Aircraft[]>;
}

export class AircraftRepository implements IAircraftRepository {
  private ormRepository: Repository<Aircraft>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Aircraft);
  }

  async createAircraft(aircraft: Aircraft): Promise<Aircraft> {
    return await this.ormRepository.save(aircraft);
  }

  async findAircraftByName(name: string): Promise<Aircraft> {
    return await this.ormRepository.findOneBy({
      name: name
    });
  }

  async getAll(): Promise<Aircraft[]> {
    return await this.ormRepository.find();
  }
}
