import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

// Determine the environment from NODE_ENV; default to 'development' if not set
const nodeEnv = process.env.NODE_ENV || 'development';

// Load the appropriate .env file based on the environment
dotenv.config({ path: path.join(process.cwd(), `.env.${nodeEnv}`) });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    SERVICE_NAME: Joi.string(),
    PORT: Joi.number().default(3000),
    POSTGRES_HOST: Joi.string().default('localhost').description('Postgres host'),
    POSTGRES_PORT: Joi.number().default(5432).description('Postgres host'),
    POSTGRES_USERNAME: Joi.string().default('postgres').description('Postgres username'),
    POSTGRES_PASSWORD: Joi.string().default('postgres').description('Postgres password'),
    POSTGRES_Database: Joi.string()
      .default('default_database')
      .description('Postgres database name'),
    POSTGRES_SYNCHRONIZE: Joi.boolean()
      .default(false)
      .description('Synchronize if true it dosent use migrations'),
    POSTGRES_ENTITIES: Joi.string().description('Postgres entities'),
    POSTGRES_MIGRATIONS: Joi.string().description('Postgres migrations'),
    POSTGRES_LOGGING: Joi.boolean().default(false).description('Postgres logging'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    RABBITMQ_Host: Joi.string().default('localhost').description('Rabbitmq host'),
    RABBITMQ_PORT: Joi.number().default(5672).description('Rabbitmq port'),
    RABBITMQ_USERNAME: Joi.string().default('guest').description('Rabbitmq username'),
    RABBITMQ_PASSWORD: Joi.string().default('guest').description('Rabbitmq password'),
    RABBITMQ_EXCHANGE: Joi.string().description('Rabbitmq exchange'),
    RETRY_COUNT: Joi.number().default(3).description('Number of retries'),
    RETRY_FACTOR: Joi.number().default(2).description('Exponential backoff factor'),
    RETRY_MIN_TIMEOUT: Joi.number()
      .default(1000)
      .description('Minimum time before retrying (1 second)'),
    RETRY_MAX_TIMEOUT: Joi.number()
      .default(60000)
      .description('Maximum time before retrying (60 seconds)'),
    OPEN_TELEMETRY_COLLECTOR_URL: Joi.string()
      .default('http://localhost:4317')
      .description('Collector URL'),
    OPEN_TELEMETRY_SERVICE_VERSION: Joi.string().default("1.0.0").description('Service Version'),
    OPEN_TELEMETRY_SERVICE_NAME: Joi.string()
      .default('default_service_name')
      .description('Service Name')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  serviceName: envVars.SERVICE_NAME,
  port: envVars.PORT,
  postgres: {
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USERNAME,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_Database,
    synchronize: envVars.POSTGRES_SYNCHRONIZE,
    entities: envVars.POSTGRES_ENTITIES,
    migrations: envVars.POSTGRES_MIGRATIONS,
    logging: envVars.POSTGRES_LOGGING
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
  },
  rabbitmq: {
    host: envVars.RABBITMQ_Host,
    port: envVars.RABBITMQ_PORT,
    username: envVars.RABBITMQ_USERNAME,
    password: envVars.RABBITMQ_PASSWORD,
    exchange: envVars.RABBITMQ_EXCHANGE
  },
  retry: {
    count: envVars.RETRY_COUNT,
    factor: envVars.RETRY_FACTOR,
    minTimeout: envVars.RETRY_MIN_TIMEOUT,
    maxTimeout: envVars.RETRY_MAX_TIMEOUT
  },
  opentelemetry: {
    serviceName: envVars.OPEN_TELEMETRY_SERVICE_NAME,
    serviceVersion: envVars.OPEN_TELEMETRY_SERVICE_VERSION,
    collectorUrl: envVars.OPEN_TELEMETRY_COLLECTOR_URL
  }
};
