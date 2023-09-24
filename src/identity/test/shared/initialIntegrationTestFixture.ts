import { postgresContainerStart } from 'building-blocks/test/container/postgres/postgresContainer';
import { initialDatabase } from '../../src/data/dataSource';
import passport from 'passport';
import { RegisterRoutes } from '../../src/routes/routes';
import { errorHandler } from 'building-blocks/middlewares/errorHandler';
import { initialRabbitmq } from '../../src/extensions/rabbitmqExtensions';
import { registerMediatrHandlers } from '../../src/extensions/mediatrExtensions';
import { rabbitMqContainerStart } from 'building-blocks/test/container/rabbitmq/rabbitmqContainer';
import { DataSource } from 'typeorm';
import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq';
import { StartedTestContainer } from 'testcontainers';
import { container } from 'tsyringe';
import { IUserRepository, UserRepository } from '../../src/data/repositories/userRepository';
import { AuthRepository, IAuthRepository } from '../../src/data/repositories/authRepository';
import express from 'express';
import config from 'building-blocks/config/config';

export class IntegrationTestFixture {
  databaseConnection: DataSource;
  rabbitMQConnection: RabbitMQConnection;
  userRepository: IUserRepository;
  authRepository: IAuthRepository;
  postgresContainer: StartedTestContainer;
  rabbitmqContainer: StartedTestContainer;
}

export const initialIntegrationTestFixture = async (): Promise<IntegrationTestFixture> => {
  const integrationFixture: IntegrationTestFixture = new IntegrationTestFixture();

  const [pgOptions, pgContainer] = await postgresContainerStart();
  integrationFixture.postgresContainer = pgContainer;

  const [rabbitOptions, rabbitContainer] = await rabbitMqContainerStart();
  integrationFixture.rabbitmqContainer = rabbitContainer;

  const app = express();

  integrationFixture.databaseConnection = await initialDatabase(pgOptions);

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());

  RegisterRoutes(app);

  app.use(errorHandler);

  integrationFixture.rabbitMQConnection = await initialRabbitmq(rabbitOptions);

  await registerMediatrHandlers();

  integrationFixture.userRepository = container.resolve(UserRepository);
  integrationFixture.authRepository = container.resolve(AuthRepository);

  return integrationFixture;
};
