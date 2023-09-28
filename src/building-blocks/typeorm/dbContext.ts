import { Connection, createConnection, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../config/config';
import { Logger } from '../logging/logger';
import { container, injectable } from 'tsyringe';

let connection: Connection = null;

export interface IDbContext {
  initialize(options?: PostgresConnectionOptions): Promise<Connection>;

  closeConnection(): Promise<void>;

  get connection(): Connection | null;
}

export interface IDataSeeder {
  seedData(): Promise<void>;
}

@injectable()
export class DbContext implements IDbContext {
  logger = container.resolve(Logger);

  async initialize(options?: PostgresConnectionOptions): Promise<Connection> {
    const dataSourceOptions: DataSourceOptions = {
      type: options?.type ?? 'postgres',
      host: options?.host ?? config.postgres.host,
      port: options?.port ?? config.postgres.port,
      username: options?.username ?? config.postgres.username,
      password: options?.password ?? config.postgres.password,
      database: options?.database ?? config.postgres.database,
      synchronize: options?.synchronize ?? config.postgres.synchronize,
      entities: [options?.entities ?? config.postgres.entities],
      migrations: [options?.migrations ?? config.postgres.migrations],
      logging: options?.logging ?? false
    };

    try {
      connection = await createConnection(dataSourceOptions);

      if (config.env !== 'test') {
        await connection.runMigrations(); // Fixed this line
        this.logger.info('Migrations run successfully!');
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
