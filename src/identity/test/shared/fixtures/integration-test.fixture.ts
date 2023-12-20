import { postgresContainerStart } from 'building-blocks/test/container/postgres/postgres-container';
import passport from 'passport';
import { RegisterRoutes } from '../../../src/routes/routes';
import { rabbitMqContainerStart } from 'building-blocks/test/container/rabbitmq/rabbitmq-container';
import { DataSource } from 'typeorm';
import { StartedTestContainer } from 'testcontainers';
import { container } from 'tsyringe';
import express, { Express } from 'express';
import { erroHandler } from 'building-blocks/error-handler/erro-handler';
import { AuthRepository, IAuthRepository } from '../../../src/data/repositories/auth.repository';
import { IUserRepository, UserRepository } from '../../../src/data/repositories/user.repository';
import { initialRabbitmq } from '../../../src/extensions/rabbitmq.extensions';
import { registerMediatrHandlers } from '../../../src/extensions/mediatr.extensions';
import { initialDbContext } from '../../../src/data/db.context';
import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq-connection';
import { Consumer, IConsumer } from 'building-blocks/rabbitmq/rabbitmq-consumer';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';

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

    this.fixture.app.use(erroHandler);

    await initialRabbitmq(rabbitOptions);

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
