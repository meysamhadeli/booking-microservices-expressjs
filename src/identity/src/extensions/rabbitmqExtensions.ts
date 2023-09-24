import { container } from 'tsyringe';
import { RabbitMQConnection, RabbitmqOptions } from 'building-blocks/rabbitmq/rabbitmq';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/publisher';

export const initialRabbitmq = async (options?: RabbitmqOptions): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);
  await rabbitMQConnection.createConnection(options);

  container.register<IPublisher>('IPublisher', Publisher);

  return rabbitMQConnection;
};
