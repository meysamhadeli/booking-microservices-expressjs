import { postgresContainerStart } from 'building-blocks/test/container/postgres/postgresContainer';
import passport from 'passport';
import { RegisterRoutes } from '../../src/routes/routes';
import { errorHandler } from 'building-blocks/middlewares/errorHandler';
import { registerMediatrHandlers } from '../../src/extensions/mediatrExtensions';
import { rabbitMqContainerStart } from 'building-blocks/test/container/rabbitmq/rabbitmqContainer';
import { DataSource } from 'typeorm';
import {
  Consumer,
  IConsumer,
  IPublisher,
  Publisher,
  RabbitMQConnection
} from 'building-blocks/rabbitmq/rabbitmq';
import { StartedTestContainer } from 'testcontainers';
import { container } from 'tsyringe';
import { IUserRepository, UserRepository } from '../../src/data/repositories/userRepository';
import { AuthRepository, IAuthRepository } from '../../src/data/repositories/authRepository';
import express, { Express } from 'express';
import { initialRabbitmq } from '../../src/extensions/rabbitmqExtensions';
import { initialDbContext } from '../../src/data/dbContext';

export class IntegrationTestFixture {
  databaseConnection: DataSource;
  rabbitMQConnection: RabbitMQConnection;
  userRepository: IUserRepository;
  authRepository: IAuthRepository;
  postgresContainer: StartedTestContainer;
  rabbitmqContainer: StartedTestContainer;
  consumer: IConsumer;
  publisher: IPublisher;
  app: Express;
}

export const initialIntegrationTestFixture = async (): Promise<IntegrationTestFixture> => {
  const integrationFixture: IntegrationTestFixture = new IntegrationTestFixture();

  const [pgOptions, pgContainer] = await postgresContainerStart();
  integrationFixture.postgresContainer = pgContainer;

  const [rabbitOptions, rabbitContainer] = await rabbitMqContainerStart();
  integrationFixture.rabbitmqContainer = rabbitContainer;

  integrationFixture.app = express();

  integrationFixture.databaseConnection = await initialDbContext(pgOptions);

  integrationFixture.app.use(express.json());

  integrationFixture.app.use(express.urlencoded({ extended: true }));

  integrationFixture.app.use(passport.initialize());

  RegisterRoutes(integrationFixture.app);

  integrationFixture.app.use(errorHandler);

  integrationFixture.rabbitMQConnection = await initialRabbitmq(rabbitOptions);

  await registerMediatrHandlers();

  integrationFixture.userRepository = container.resolve(UserRepository);
  integrationFixture.authRepository = container.resolve(AuthRepository);
  integrationFixture.publisher = container.resolve(Publisher);
  integrationFixture.consumer = container.resolve(Consumer);

  return integrationFixture;
};
