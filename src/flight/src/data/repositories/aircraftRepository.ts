import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/dbContext';
import { Aircraft } from '../../aircraft/entities/aircraft';

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

  async createAircraft(user: Aircraft): Promise<Aircraft> {
    return await this.ormRepository.save(user);
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
