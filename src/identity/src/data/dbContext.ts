import { container } from 'tsyringe';
import { DbContext, IDbContext } from 'building-blocks/typeorm/dbContext';
import { registerRepositories } from '../extensions/repositoryExtensions';
import { Connection } from 'typeorm';
import { UserSeed } from './seeds/userSeed';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const initialDbContext = async (
  options?: PostgresConnectionOptions
): Promise<Connection> => {
  container.registerSingleton<IDbContext>('IDbContext', DbContext);

  const dbContext = container.resolve(DbContext);

  const connection = await dbContext.initialize(options);

  const userSeed = container.resolve(UserSeed);
  await userSeed.seedData();

  await registerRepositories();

  return connection;
};
