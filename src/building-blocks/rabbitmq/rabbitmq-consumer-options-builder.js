'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RabbitmqConsumerOptionsBuilder = exports.RabbitmqConsumerOptions = void 0;
class RabbitmqConsumerOptions {}
exports.RabbitmqConsumerOptions = RabbitmqConsumerOptions;
class RabbitmqConsumerOptionsBuilder {
  constructor() {
    this._options = new RabbitmqConsumerOptions();
  }
  exchangeName(exchangeName) {
    this._options.exchangeName = exchangeName;
    return this;
  }
  handler(handler) {
    this._options.handler = handler;
    return this;
  }
  build() {
    return this._options;
  }
}
exports.RabbitmqConsumerOptionsBuilder = RabbitmqConsumerOptionsBuilder;
//# sourceMappingURL=rabbitmq-consumer-options-builder.js.map
