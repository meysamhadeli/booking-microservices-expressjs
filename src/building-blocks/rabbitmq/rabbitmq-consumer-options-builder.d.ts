import { handlerFunc } from './rabbitmq-consumer';
export declare class RabbitmqConsumerOptions {
  exchangeName: string;
  handler: handlerFunc<any>;
}
export declare class RabbitmqConsumerOptionsBuilder {
  private _options;
  exchangeName(exchangeName: string): RabbitmqConsumerOptionsBuilder;
  handler<T>(handler: handlerFunc<T>): RabbitmqConsumerOptionsBuilder;
  build(): RabbitmqConsumerOptions;
}
