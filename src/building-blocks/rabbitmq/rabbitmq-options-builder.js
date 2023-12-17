"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqOptionsBuilder = void 0;
const rabbitmq_connection_1 = require("./rabbitmq-connection");
class RabbitmqOptionsBuilder {
    constructor() {
        this._options = new rabbitmq_connection_1.RabbitmqOptions();
    }
    get host() {
        return this._options.host;
    }
    set host(value) {
        this._options.host = value;
    }
    get port() {
        return this._options.port;
    }
    set port(value) {
        this._options.port = value;
    }
    get username() {
        return this._options.username;
    }
    set username(value) {
        this._options.username = value;
    }
    get password() {
        return this._options.password;
    }
    set password(value) {
        this._options.password = value;
    }
    build() {
        return this._options;
    }
}
exports.RabbitmqOptionsBuilder = RabbitmqOptionsBuilder;
//# sourceMappingURL=rabbitmq-options-builder.js.map