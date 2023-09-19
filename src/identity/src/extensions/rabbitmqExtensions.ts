import { RabbitMQConnection } from 'building-blocks/rabbitmq/rabbitmq';

export const initialRabbitmq = async () => {
  const rabbitMQConnection = new RabbitMQConnection();
  await rabbitMQConnection.createConnection();
};
