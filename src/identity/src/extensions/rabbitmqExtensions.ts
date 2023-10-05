import { container } from 'tsyringe';
import {
  IPublisher,
  Publisher,
  RabbitMQConnection,
  RabbitmqOptions
} from 'building-blocks/rabbitmq/rabbitmq';


export const initialRabbitmq = async (options?: RabbitmqOptions): Promise<RabbitMQConnection> => {
  const rabbitMQConnection = container.resolve(RabbitMQConnection);
  await rabbitMQConnection.createConnection(options);

  container.register<IPublisher>('IPublisher', Publisher);

  return rabbitMQConnection;
};
