"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConnection = exports.RabbitmqOptions = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../logging/logger");
const rabbitmq_options_builder_1 = require("./rabbitmq-options-builder");
const amqp = __importStar(require("amqplib"));
const config_1 = __importDefault(require("../config/config"));
const async_retry_1 = __importDefault(require("async-retry"));
class RabbitmqOptions {
}
exports.RabbitmqOptions = RabbitmqOptions;
let connection = null;
let channel = null;
let RabbitMQConnection = class RabbitMQConnection {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async createConnection(rabbitmqOptionsBuilder) {
        var _a, _b;
        if (!connection || !connection == undefined) {
            try {
                const builder = new rabbitmq_options_builder_1.RabbitmqOptionsBuilder();
                rabbitmqOptionsBuilder(builder);
                const options = builder.build();
                const host = (_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : config_1.default.rabbitmq.host;
                const port = (_b = options === null || options === void 0 ? void 0 : options.port) !== null && _b !== void 0 ? _b : config_1.default.rabbitmq.port;
                await (0, async_retry_1.default)(async () => {
                    var _a, _b;
                    connection = await amqp.connect(`amqp://${host}:${port}`, {
                        username: (_a = options === null || options === void 0 ? void 0 : options.username) !== null && _a !== void 0 ? _a : config_1.default.rabbitmq.username,
                        password: (_b = options === null || options === void 0 ? void 0 : options.password) !== null && _b !== void 0 ? _b : config_1.default.rabbitmq.password
                    });
                    this.logger.info('RabbitMq connection created successfully');
                }, {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
                connection.on('error', async (error) => {
                    this.logger.error(`Error occurred on connection: ${error}`);
                    await this.closeConnection();
                    await this.createConnection();
                });
            }
            catch (error) {
                throw new Error('Rabbitmq connection is failed!');
            }
        }
        return connection;
    }
    async getChannel() {
        try {
            if (!connection) {
                throw new Error('Rabbitmq connection is failed!');
            }
            if ((connection && !channel) || !channel) {
                await (0, async_retry_1.default)(async () => {
                    channel = await connection.createChannel();
                    this.logger.info('Channel Created successfully');
                }, {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
            }
            channel.on('error', async (error) => {
                this.logger.error(`Error occurred on channel: ${error}`);
                await this.closeChanel();
                await this.getChannel();
            });
            return channel;
        }
        catch (error) {
            this.logger.error('Failed to get channel!');
        }
    }
    async closeChanel() {
        try {
            if (channel) {
                await channel.close();
                this.logger.info('Channel closed successfully');
            }
        }
        catch (error) {
            this.logger.error('Channel close failed!');
        }
    }
    async closeConnection() {
        try {
            if (connection) {
                await connection.close();
                this.logger.info('Connection closed successfully');
            }
        }
        catch (error) {
            this.logger.error('Connection close failed!');
        }
    }
};
exports.RabbitMQConnection = RabbitMQConnection;
exports.RabbitMQConnection = RabbitMQConnection = __decorate([
    (0, tsyringe_1.injectable)()
], RabbitMQConnection);
//# sourceMappingURL=rabbitmq-connection.js.map