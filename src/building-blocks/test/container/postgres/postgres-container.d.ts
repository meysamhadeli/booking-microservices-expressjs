import 'reflect-metadata';
import { StartedTestContainer } from 'testcontainers';
import { DataSourceOptions } from 'typeorm';
export declare const postgresContainerStart: () => Promise<[DataSourceOptions, StartedTestContainer]>;
