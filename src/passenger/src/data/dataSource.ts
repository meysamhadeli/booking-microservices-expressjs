import { createConnection, DataSource, DataSourceOptions } from 'typeorm';
import config from 'building-blocks/config/config';
import Logger from 'building-blocks/logging/logger';

export let dataSource: DataSource = null;

export const initialDatabase = async (): Promise<DataSource> => {
  const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: config.postgres.host,
    port: config.postgres.port,
    username: config.postgres.userName,
    password: config.postgres.password,
    database: config.postgres.database,
    entities: ['src/**/entities/*.js'],
    migrations: ['src/**/migrations/*.js'],
    synchronize: false,
    logging: false
  };

  await createConnection(dataSourceOptions)
    .then((connection) => {
      dataSource = connection;

      dataSource
        .runMigrations()
        .then(async () => {
          Logger.info('Migrations run successfully!');

          return dataSource;
        })
        .catch((err) => {
          throw new Error('Error during running the Migrations!');
        });
    })
    .catch((error) => {
      throw new Error(`Error during Data Source initialization: ${error.toString()}`);
    });

  return dataSource;
};
