import { container } from 'tsyringe';
import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/publisher';

export const initialRabbitmq = async (): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);
  await rabbitMQConnection.createConnection();

  container.register<IPublisher>('IPublisher', Publisher);

  return null;
};
