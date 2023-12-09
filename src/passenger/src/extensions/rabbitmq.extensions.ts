import { container } from 'tsyringe';
import {
  Consumer,
  IConsumer,
  IPublisher,
  Publisher,
  RabbitMQConnection, RabbitmqOptions
} from 'building-blocks/rabbitmq/rabbitmq';
import { UserCreated } from 'building-blocks/contracts/identity.contract';
import {createUserConsumerHandler} from "../user/consumers/create-user";

export const initialRabbitmq = async (options?: RabbitmqOptions): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);
  await rabbitMQConnection.createConnection(options);

  container.register<IPublisher>('IPublisher', Publisher);
  container.register<IConsumer>('IConsumer', Consumer);

  const consumers = container.resolve(Consumer);

  await consumers.consumeMessage(new UserCreated(), createUserConsumerHandler);

  return rabbitMQConnection;
};
