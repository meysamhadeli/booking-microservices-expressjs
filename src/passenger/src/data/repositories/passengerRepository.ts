import { Passenger } from '../../passenger/entities/passenger';
import { dataSource } from '../dataSource';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DbContext } from 'building-blocks/typeorm/dbContext';
import { container } from 'tsyringe';

export interface IPassengerRepository {
  createPassenger(passenger: Passenger): Promise<Passenger>;

  findPassengerById(id: number): Promise<Passenger>;

  findPassengers(
    page: number,
    pageSize: number,
    orderBy: string,
    order: 'ASC' | 'DESC',
    searchTerm?: string
  ): Promise<[Passenger[], number]>;
}

export class PassengerRepository implements IPassengerRepository {
  private ormRepository: Repository<Passenger>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Passenger);
  }

  async createPassenger(passenger: Passenger): Promise<Passenger> {
    return await this.ormRepository.save(passenger);
  }

  async findPassengerById(id: number): Promise<Passenger> {
    return this.ormRepository.findOneBy({ id: id });
  }

  async findPassengers(
    page: number,
    pageSize: number,
    orderBy: string,
    order: 'ASC' | 'DESC',
    searchTerm?: string
  ): Promise<[Passenger[], number]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const queryBuilder: SelectQueryBuilder<Passenger> = this.ormRepository
      .createQueryBuilder('passenger')
      .orderBy(`passenger.${orderBy}`, order)
      .skip(skip)
      .take(take);

    // Apply filter criteria to the query
    if (searchTerm) {
      queryBuilder.andWhere('passenger.name LIKE :name', { name: `%${searchTerm}%` });
    }

    return await queryBuilder.getManyAndCount();
  }
}
