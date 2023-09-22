import { User } from '../../user/entities/user';
import { dataSource } from '../dataSource';
import { Repository, SelectQueryBuilder } from 'typeorm';

export interface IUserRepository {
  createUser(user: User): Promise<User>;

  updateUser(user: User): Promise<User>;

  findUsers(
    page: number,
    pageSize: number,
    orderBy: string,
    order: 'ASC' | 'DESC',
    searchTerm?: string
  ): Promise<[User[], number]>;

  findUserByName(name: string): Promise<User>;

  findUserByEmail(email: string): Promise<User>;

  findUserById(id: number): Promise<User>;

  getAllUsers(): Promise<User[]>;

  removeUser(user: User): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async findUsers(
    page: number,
    pageSize: number,
    orderBy: string,
    order: 'ASC' | 'DESC',
    searchTerm?: string
  ): Promise<[User[], number]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const queryBuilder: SelectQueryBuilder<User> = this.ormRepository
      .createQueryBuilder('user')
      .orderBy(`user.${orderBy}`, order)
      .skip(skip)
      .take(take);

    // Apply filter criteria to the query
    if (searchTerm) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${searchTerm}%` });
    }

    return await queryBuilder.getManyAndCount();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.ormRepository.findOneBy({
      email: email
    });
  }

  async findUserById(id: number): Promise<User> {
    return await this.ormRepository.findOneBy({
      id: id
    });
  }

  async findUserByName(name: string): Promise<User> {
    return await this.ormRepository.findOneBy({
      name: name
    });
  }

  async removeUser(user: User): Promise<User> {
    return await this.ormRepository.remove(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.ormRepository.find();
  }
}
