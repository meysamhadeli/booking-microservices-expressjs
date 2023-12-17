import { RabbitMQConnection, RabbitmqOptions } from 'building-blocks/rabbitmq/rabbitmq-connection';
import { container } from 'tsyringe';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';
import { Consumer, IConsumer } from 'building-blocks/rabbitmq/rabbitmq-consumer';
import { UserCreated } from 'building-blocks/contracts/identity.contract';
import { createUserConsumerHandler } from '../user/consumers/create-user';

export const initialRabbitmq = async (options?: RabbitmqOptions): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);

  await rabbitMQConnection.createConnection((optionsBuilder) => {
    optionsBuilder.host = options?.host;
    optionsBuilder.port = options?.port;
    optionsBuilder.username = options?.username;
    optionsBuilder.password = options?.password;
  });

  container.register<IPublisher>('IPublisher', Publisher);
  container.register<IConsumer>('IConsumer', Consumer);

  const consumers = container.resolve(Consumer);

  await consumers.consumeMessage(new UserCreated(), createUserConsumerHandler);

  return rabbitMQConnection;
};
