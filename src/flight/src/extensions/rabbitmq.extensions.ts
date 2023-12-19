import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq-connection';
import { container } from 'tsyringe';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';
import { RabbitmqOptions } from 'building-blocks/rabbitmq/rabbitmq-options-builder';

export const initialRabbitmq = async (options?: RabbitmqOptions): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);

  await rabbitMQConnection.createConnection((optionsBuilder) => {
    optionsBuilder.host = options?.host;
    optionsBuilder.port = options?.port;
    optionsBuilder.username = options?.username;
    optionsBuilder.password = options?.password;
  });

  container.register<IPublisher>('IPublisher', Publisher);

  return rabbitMQConnection;
};
