import 'reflect-metadata';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { container } from 'tsyringe';
import { Logger } from '../../../logging/logger';
import {MixedList} from "typeorm/common/MixedList";
import {EntitySchema} from "typeorm/entity-schema/EntitySchema";

interface PostgresContainerOptions {
  imageName: string;
  type: string;
  database: string;
  port: number;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
  entities: MixedList<Function | string | EntitySchema>;
}

export const postgresContainerStart = async (): Promise<
  [PostgresConnectionOptions, StartedTestContainer]
> => {
  const logger = container.resolve(Logger);

  const defaultPostgresOptions = await getDefaultPostgresTestContainers();

  const pgContainerStarted = await getContainerStarted(defaultPostgresOptions);

  const containerPort = pgContainerStarted.getMappedPort(defaultPostgresOptions.port);

  const postgresConnectionOption: PostgresConnectionOptions = {
    ...defaultPostgresOptions,
    type: 'postgres',
    port: containerPort
  };

  logger.info(`Test postgres with port ${postgresConnectionOption.port} established`);

  return [postgresConnectionOption, pgContainerStarted];
};

const getContainerStarted = async (
  options: PostgresContainerOptions
): Promise<StartedTestContainer> => {
  const pgContainer = new GenericContainer(options.imageName)
    .withExposedPorts(options.port)
    .withEnvironment({ POSTGRES_USER: options.username })
    .withEnvironment({ POSTGRES_PASSWORD: options.password?.toString() })
    .withEnvironment({ POSTGRES_DB: options.database });
  const pgContainerStarted = await pgContainer.start();

  return pgContainerStarted;
};

const getDefaultPostgresTestContainers = async (): Promise<PostgresContainerOptions> => {
  const postgresOptions: PostgresContainerOptions = {
    type: 'postgres',
    database: 'test_db',
    port: 5432,
    host: 'localhost',
    username: 'testcontainers',
    password: 'testcontainers',
    imageName: 'postgres:latest',
    synchronize: true,
    entities: ['src/**/entities/*.{js,ts}']
  };

  return postgresOptions;
};
