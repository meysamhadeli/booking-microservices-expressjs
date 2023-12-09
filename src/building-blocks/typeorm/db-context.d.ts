import { Connection, DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Logger } from '../logging/logger';
export interface IDbContext {
    initialize(options?: PostgresConnectionOptions): Promise<Connection>;
    closeConnection(): Promise<void>;
    get connection(): Connection | null;
}
export interface IDataSeeder {
    seedData(dataSource: DataSource): Promise<void>;
}
export declare class DbContext implements IDbContext {
    logger: Logger;
    initialize(options?: PostgresConnectionOptions): Promise<Connection>;
    get connection(): Connection | null;
    closeConnection(): Promise<void>;
}
