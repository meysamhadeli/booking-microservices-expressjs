'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RabbitmqConnectionOptionsBuilder = exports.RabbitmqConnectionOptions = void 0;
class RabbitmqConnectionOptions {}
exports.RabbitmqConnectionOptions = RabbitmqConnectionOptions;
class RabbitmqConnectionOptionsBuilder {
  constructor() {
    this._options = new RabbitmqConnectionOptions();
  }
  host(value) {
    this._options.host = value;
    return this;
  }
  port(value) {
    this._options.port = value;
    return this;
  }
  username(value) {
    this._options.username = value;
    return this;
  }
  password(value) {
    this._options.password = value;
    return this;
  }
  build() {
    return this._options;
  }
}
exports.RabbitmqConnectionOptionsBuilder = RabbitmqConnectionOptionsBuilder;
//# sourceMappingURL=rabbitmq-connection-options-builder.js.map
