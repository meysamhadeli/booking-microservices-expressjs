import { Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export declare const initialDbContext: (options?: PostgresConnectionOptions) => Promise<Connection>;
