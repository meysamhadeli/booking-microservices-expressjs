import config from 'building-blocks/config/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RabbitmqOptions } from 'building-blocks/rabbitmq/rabbitmq';

export const postgresOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: config.postgres.synchronize,
  entities: [config.postgres.entities],
  migrations: [config.postgres.migrations],
  logging: config.postgres.logging
};

export const rabbitmqOptions: RabbitmqOptions = {
  host: config.rabbitmq.host,
  port: config.rabbitmq.port,
  username: config.rabbitmq.username,
  password: config.rabbitmq.password
};
