import { container } from 'tsyringe';
import { Connection, DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DbContext, IDbContext } from '../../../building-blocks/typeorm/dbContext';

export const initialDbContext = async (options: DataSource): Promise<Connection> => {
  container.register<IDbContext>('IDbContext', DbContext);

  const dbContext = container.resolve(DbContext);

  const connection = await dbContext.initialize(options);

  // const userSeed = container.resolve(UserSeed);
  // await userSeed.seedData();
  //
  // await registerRepositories();

  return connection;
};
