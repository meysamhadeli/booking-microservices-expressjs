import { container } from 'tsyringe';
import { DbContext, IDbContext } from 'building-blocks/typeorm/db-context';
import { Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {UserSeed} from "./seeds/user.seed";
import {registerRepositories} from "../extensions/repository.extensions";

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
