import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config/config';
import { Logger } from '../logging/logger';
import { container, injectable, instanceCachingFactory } from 'tsyringe';

let connection: DataSource = null;

export interface IDbContext {
  initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<DataSource>;

  closeConnection(): Promise<void>;

  get connection(): DataSource | null;
}

export interface IDataSeeder {
  seedData(dataSource: DataSource): Promise<void>;
}

@injectable()
export class DbContext implements IDbContext {
  async initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<DataSource> {
    try {
      connection = await new DataSource(dataSourceOptions).initialize();

      Logger.info('Data Source has been initialized!');

      if (config.env !== 'test') {
        try {
        } catch (error) {
          Logger.error('Error during running the Migrations!');
        }
        await connection.runMigrations();
        Logger.info('Migrations run successfully!');
      }
    } catch (error) {
      throw new Error(`Error during database initialization: ${error.toString()}`);
    }

    return connection;
  }

  get connection(): DataSource | null {
    return connection;
  }

  async closeConnection(): Promise<void> {
    await connection.destroy();
  }
}
