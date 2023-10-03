import { container } from 'tsyringe';
import { DbContext, IDbContext } from 'building-blocks/typeorm/dbContext';
import { registerRepositories } from '../extensions/repositoryExtensions';
import { Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const initialDbContext = async (
  options?: PostgresConnectionOptions
): Promise<Connection> => {
  container.register<IDbContext>('IDbContext', DbContext);

  const dbContext = container.resolve(DbContext);

  const connection = await dbContext.initialize(options);

  await registerRepositories();

  return connection;
};
