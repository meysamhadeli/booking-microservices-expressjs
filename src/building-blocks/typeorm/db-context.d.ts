import { Connection, DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '../logging/logger';
export interface IDbContext {
    initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<Connection>;
    closeConnection(): Promise<void>;
    get connection(): Connection | null;
}
export interface IDataSeeder {
    seedData(dataSource: DataSource): Promise<void>;
}
export declare class DbContext implements IDbContext {
    logger: Logger;
    initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<Connection>;
    get connection(): Connection | null;
    closeConnection(): Promise<void>;
}
