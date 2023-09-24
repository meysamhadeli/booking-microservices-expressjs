import { createConnection, DataSource, DataSourceOptions } from 'typeorm';
import config from 'building-blocks/config/config';
import { seedUser } from './seeds/seedUser';
import Logger from 'building-blocks/logging/logger';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { registerRepositories } from '../extensions/repositoryExtensions';

export let dataSource: DataSource = null;

export const initialDatabase = async (options?: PostgresConnectionOptions): Promise<DataSource> => {
  const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: options?.host ?? config.postgres.host,
    port: options?.port ?? config.postgres.port,
    username: options?.username ?? config.postgres.username,
    password: options?.password ?? config.postgres.password,
    database: options?.database ?? config.postgres.database,
    synchronize: options?.synchronize ?? config.postgres.synchronize,
    entities: ['src/**/entities/*.js'],
    migrations: ['src/**/migrations/*.js'],
    logging: false
  };

  await createConnection(dataSourceOptions)
    .then((connection) => {
      dataSource = connection;

      if (config.env !== 'test') {
        dataSource
          .runMigrations()
          .then(async () => {
            Logger.info('Migrations run successfully!');

            await seedUser();

            return dataSource;
          })
          .catch((err) => {
            throw new Error('Error during running the Migrations!');
          });
      }
    })
    .catch((error) => {
      throw new Error(`Error during Data Source initialization: ${error.toString()}`);
    });

  await registerRepositories();

  return dataSource;
};
