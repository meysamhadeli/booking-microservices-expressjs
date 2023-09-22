import { DataSource } from 'typeorm';
import Logger from 'building-blocks/logging/logger';
import applicationException from 'building-blocks/types/exception/applicationException';
import { seedUser } from './seeds/seedUser';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'identity',
  logging: true,
  synchronize: false, // Disable automatic table generation
  entities: ['src/**/entities/*.js'],
  migrations: ['src/data/migrations/*.js']
});

export const initialDataSource = async () => {
  dataSource
    .initialize()
    .then(() => {
      Logger.info('Data Source has been initialized!');

      dataSource
        .runMigrations()
        .then(async () => {
          Logger.info('Migrations run successfully!');

          await seedUser();
        })
        .catch((err) => {
          throw new applicationException('Error during running the Migrations!');
        });
    })
    .catch((err) => {
      throw new applicationException('Error during Data Source initialization:', err);
    });
};
