import 'reflect-metadata';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { container } from 'tsyringe';
import { Logger } from '../../../logging/logger';
import {RabbitmqConnectionOptions} from "../../../rabbitmq/rabbitmq-connection-options-builder";

interface RabbitmqContainerOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  imageName: string;
}

export const rabbitMqContainerStart = async (): Promise<
  [RabbitmqConnectionOptions, StartedTestContainer]
> => {
  const logger = container.resolve(Logger);

  const defaultRabbitmqOptions = await getDefaultRabbitmqTestContainers();

  const rabbitmqContainerStarted = await getContainerStarted(defaultRabbitmqOptions);

  const containerPort = rabbitmqContainerStarted.getMappedPort(defaultRabbitmqOptions.port);

  const rabbitmqOptions: RabbitmqConnectionOptions = {
    ...defaultRabbitmqOptions,
    port: containerPort
  };

  logger.info(`Test rabbitmq with port ${rabbitmqOptions.port} established`);

  return [rabbitmqOptions, rabbitmqContainerStarted];
};

const getContainerStarted = async (
  options: RabbitmqContainerOptions
): Promise<StartedTestContainer> => {
  const rabbitmqContainer = new GenericContainer(options.imageName)
    .withExposedPorts(options.port)
    .withEnvironment({ RABBITMQ_DEFAULT_USER: options.username })
    .withEnvironment({ RABBITMQ_DEFAULT_PASS: options.password?.toString() });
  const rabbitmqContainerStarted = await rabbitmqContainer.start();

  return rabbitmqContainerStarted;
};

const getDefaultRabbitmqTestContainers = async (): Promise<RabbitmqContainerOptions> => {
  const rabbitmqOptions: RabbitmqContainerOptions = {
    port: 5672,
    host: 'localhost',
    username: 'guest',
    password: 'guest',
    imageName: 'rabbitmq:3-management'
  };

  return rabbitmqOptions;
};
