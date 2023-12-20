import { container, injectable } from 'tsyringe';
import { RabbitMQConnection } from './rabbitmq-connection';
import { Consumer } from './rabbitmq-consumer';
import { RabbitmqConnectionOptionsBuilder } from './rabbitmq-connection-options-builder';
import { RabbitmqConsumerOptionsBuilder } from './rabbitmq-consumer-options-builder';
import { IPublisher, Publisher } from './rabbitmq-publisher';

export interface IRabbitmq {
  createConnection(
    connectionOptionsBuilder?: (builder: RabbitmqConnectionOptionsBuilder) => void
  ): Promise<IRabbitmq>;

  addConsumer(
    consumerOptionsBuilder?: (builder: RabbitmqConsumerOptionsBuilder) => void
  ): Promise<IRabbitmq>;
}

@injectable()
export class Rabbitmq implements IRabbitmq {
  private readonly rabbitmqConnection: RabbitMQConnection;
  private readonly rabbitmqConsumer: Consumer;

  constructor() {
    this.rabbitmqConnection = container.resolve(RabbitMQConnection);
    this.rabbitmqConsumer = container.resolve(Consumer);
  }

  async createConnection(
    rabbitmqConnectionOptionsBuilder?: (builder: RabbitmqConnectionOptionsBuilder) => void
  ): Promise<IRabbitmq> {
    if (rabbitmqConnectionOptionsBuilder) {
      const builder = new RabbitmqConnectionOptionsBuilder();
      rabbitmqConnectionOptionsBuilder(builder);

      const connectionOptions = builder.build();

      await this.rabbitmqConnection.createConnection(connectionOptions);
    }

    return this;
  }

  async addConsumer(
    rabbitmqConsumerOptionsBuilder?: (builder: RabbitmqConsumerOptionsBuilder) => void
  ): Promise<IRabbitmq> {
    const builder = new RabbitmqConsumerOptionsBuilder();
    rabbitmqConsumerOptionsBuilder(builder);

    const consumersOptions = builder.build();

    await this.rabbitmqConsumer.addConsumer(consumersOptions);

    return this;
  }
}
