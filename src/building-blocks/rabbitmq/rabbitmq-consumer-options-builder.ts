import { handlerFunc } from './rabbitmq-consumer';

export class RabbitmqConsumerOptions {
  exchangeName: string;
  handler: handlerFunc<any>;
}

export class RabbitmqConsumerOptionsBuilder {
  private _options: RabbitmqConsumerOptions = new RabbitmqConsumerOptions();

  exchangeName(exchangeName: string): RabbitmqConsumerOptionsBuilder {
    this._options.exchangeName = exchangeName;
    return this;
  }

  handler<T>(handler: handlerFunc<T>): RabbitmqConsumerOptionsBuilder {
    this._options.handler = handler;
    return this;
  }

  build(): RabbitmqConsumerOptions {
    return this._options;
  }
}
