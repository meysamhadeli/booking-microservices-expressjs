import 'reflect-metadata';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import Logger from '../../../logging/logger';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface PostgresContainerOptions {
  imageName: string;
  type: string;
  database: string;
  port: number;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
}

export const postgresContainerStart = async (): Promise<[PostgresConnectionOptions, StartedTestContainer]> => {
  const defaultPostgresOptions = await getDefaultPostgresTestContainers();

  const pgContainerStarted = await getContainerStarted(defaultPostgresOptions);

  const containerPort = pgContainerStarted.getMappedPort(defaultPostgresOptions.port);

  const postgresConnectionOption: PostgresConnectionOptions = {
    ...defaultPostgresOptions,
    type: 'postgres',
    port: containerPort
  };

  Logger.info(`Test postgres with port ${postgresConnectionOption.port} established`);

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
    synchronize: true
  };

  return postgresOptions;
};
