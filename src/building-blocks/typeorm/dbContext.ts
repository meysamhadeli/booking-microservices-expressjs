import { Connection, createConnection, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config/config';
import Logger from '../logging/logger';
import { singleton } from 'tsyringe';

let connection: Connection = null;

export interface IDbContext {
  initialize(options: PostgresConnectionOptions): Promise<Connection>;

  closeConnection(): Promise<void>;

  get connection(): Connection | null;
}

export interface IDataSeeder {
  seedData(): Promise<void>;
}

@singleton()
export class DbContext implements IDbContext {
  async initialize(options: PostgresConnectionOptions): Promise<Connection> {
    const dataSourceOptions: DataSourceOptions = {
      type: options.type,
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: options?.synchronize,
      entities: ['src/**/entities/*.js'],
      migrations: ['src/**/migrations/*.js'],
      logging: false
    };

    try {
      connection = await createConnection(dataSourceOptions);

      if (config.env !== 'test') {
        await connection.runMigrations(); // Fixed this line
        Logger.info('Migrations run successfully!');
      }
      return connection;
    } catch (error) {
      throw new Error(`Error during database initialization: ${error.toString()}`);
    }
  }

  get connection(): Connection | null {
    return connection;
  }

  async closeConnection(): Promise<void> {
    await connection.destroy();
  }
}
