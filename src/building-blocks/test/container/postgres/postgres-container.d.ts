import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export declare const postgresContainerStart: () => Promise<[
    PostgresConnectionOptions,
    StartedTestContainer
]>;
