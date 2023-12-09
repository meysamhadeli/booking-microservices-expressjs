import config from 'building-blocks/config/config';
import { DataSource } from 'typeorm';

// use this file for running migration
export const postgresOptions: DataSource = new DataSource({
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
});
