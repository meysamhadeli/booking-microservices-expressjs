import { container } from 'tsyringe';
import {Connection, DataSourceOptions} from 'typeorm';
import {registerRepositories} from "../extensions/repository.extensions";
import {DbContext, IDbContext} from "building-blocks/typeorm/db-context";

export const initialDbContext = async (
  dataSourceOptions: DataSourceOptions
): Promise<Connection> => {
  container.registerSingleton<IDbContext>('IDbContext', DbContext);

  const dbContext = container.resolve(DbContext);

  const connection = await dbContext.initializeTypeorm(dataSourceOptions);

  await registerRepositories();

  return connection;
};
