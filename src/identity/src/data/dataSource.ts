import { DataSource } from 'typeorm';
import Logger from 'building-blocks/logging/logger';
import applicationException from 'building-blocks/types/exception/applicationException';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'node_express_template_db',
  logging: true,
  synchronize: false, // Disable automatic table generation
  entities: ['src/**/entities/*.js'],
  migrations: ['src/data/migrations/*.js']
});

export const initialDataSource = () => {
  dataSource
    .initialize()
    .then(() => {
      Logger.info('Data Source has been initialized!');

      dataSource
        .runMigrations()
        .then(() => {
          Logger.info('Migrations run successfully!');
        })
        .catch((err) => {
          throw new applicationException('Error during running the Migrations!');
        });
    })
    .catch((err) => {
      throw new applicationException('Error during Data Source initialization:', err);
    });
};
