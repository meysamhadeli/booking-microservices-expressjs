import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq';
import { container } from 'tsyringe';

export const initialRabbitmq = async (): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);
  await rabbitMQConnection.createConnection();

  return rabbitMQConnection;
};
