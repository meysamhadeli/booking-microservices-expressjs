import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '../logging/logger';
export interface IDbContext {
    initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<DataSource>;
    closeConnection(): Promise<void>;
    get connection(): DataSource | null;
}
export interface IDataSeeder {
    seedData(dataSource: DataSource): Promise<void>;
}
export declare class DbContext implements IDbContext {
    logger: Logger;
    initializeTypeorm(dataSourceOptions: DataSourceOptions): Promise<DataSource>;
    get connection(): DataSource | null;
    closeConnection(): Promise<void>;
}
