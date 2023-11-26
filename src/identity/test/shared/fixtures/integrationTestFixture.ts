import { postgresContainerStart } from 'building-blocks/test/container/postgres/postgresContainer';
import passport from 'passport';
import { RegisterRoutes } from '../../../src/routes/routes';
import { registerMediatrHandlers } from '../../../src/extensions/mediatrExtensions';
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
import { IUserRepository, UserRepository } from '../../../src/data/repositories/userRepository';
import { AuthRepository, IAuthRepository } from '../../../src/data/repositories/authRepository';
import express, { Express } from 'express';
import { initialRabbitmq } from '../../../src/extensions/rabbitmqExtensions';
import { initialDbContext } from '../../../src/data/dbContext';
import { errorHandler } from 'building-blocks/error-handler/errorHandler';

export class Fixture {
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

export class IntegrationTestFixture {
  private fixture: Fixture = new Fixture();

  public async initilizeFixture(): Promise<Fixture> {
    const [pgOptions, pgContainer] = await postgresContainerStart();
    this.fixture.postgresContainer = pgContainer;

    const [rabbitOptions, rabbitContainer] = await rabbitMqContainerStart();
    this.fixture.rabbitmqContainer = rabbitContainer;

    this.fixture.app = express();

    this.fixture.databaseConnection = await initialDbContext(pgOptions);

    this.fixture.app.use(express.json());

    this.fixture.app.use(express.urlencoded({ extended: true }));

    this.fixture.app.use(passport.initialize());

    RegisterRoutes(this.fixture.app);

    this.fixture.app.use(errorHandler);

    this.fixture.rabbitMQConnection = await initialRabbitmq(rabbitOptions);

    this.fixture.userRepository = container.resolve(UserRepository);
    this.fixture.authRepository = container.resolve(AuthRepository);
    this.fixture.publisher = container.resolve(Publisher);
    this.fixture.consumer = container.resolve(Consumer);

    await registerMediatrHandlers();

    return this.fixture;
  }

  public async cleanUp() {
    await this.fixture.postgresContainer.stop();
    await this.fixture.rabbitmqContainer.stop();
  }
}
