import { container } from 'tsyringe';
import { Rabbitmq } from 'building-blocks/rabbitmq/rabbitmq';
import { RabbitmqConnectionOptions } from 'building-blocks/rabbitmq/rabbitmq-connection-options-builder';
import { IPublisher, Publisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';

export const initialRabbitmq = async (options?: RabbitmqConnectionOptions): Promise<void> => {
  const rabbitmq = container.resolve(Rabbitmq);

  await rabbitmq
    .createConnection((builder) => {
      builder
        .host(options?.host)
        .port(options?.port)
        .username(options?.username)
        .password(options?.password);
    })
    .then(() => {
      container.register<IPublisher>('IPublisher', Publisher);
    });
};
