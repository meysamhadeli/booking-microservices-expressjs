import {Connection, ConnectionManager, createConnection, DataSource, DataSourceOptions, useContainer} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config/config';
import { Logger } from '../logging/logger';
import {container, injectable, instanceCachingFactory} from 'tsyringe';

let connection: Connection = null;

export interface IDbContext {
  initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<Connection>;

  closeConnection(): Promise<void>;

  get connection(): Connection | null;
}

export interface IDataSeeder {
  seedData(dataSource: DataSource): Promise<void>;
}

@injectable()
export class DbContext implements IDbContext {
  logger = container.resolve(Logger);

  async initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<Connection> {

    try {
      connection = await createConnection(dataSourceOptions);

      this.logger.info('Data Source has been initialized!');

      if (config.env !== 'test') {
        connection
          .runMigrations()
          .then(() => {
            this.logger.info('Migrations run successfully!');
          })
          .catch((err) => {
            this.logger.error('Error during running the Migrations!');
          });
      }
    } catch (error) {
      throw new Error(`Error during database initialization: ${error.toString()}`);
    }

    return connection;
  }

  get connection(): Connection | null {
    return connection;
  }

  async closeConnection(): Promise<void> {
    await connection.destroy();
  }
}
