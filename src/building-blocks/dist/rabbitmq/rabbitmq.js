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
exports.Consumer = exports.Publisher = exports.RabbitMQConnection = void 0;
const amqp = __importStar(require("amqplib"));
const async_retry_1 = __importDefault(require("async-retry"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
const otel_1 = require("../openTelemetry/otel");
const reflection_1 = require("../utils/reflection");
const serialization_1 = require("../utils/serialization");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const time_1 = require("../utils/time");
const uuid_1 = require("uuid");
const logger_1 = require("../logging/logger");
let connection = null;
let channel = null;
const publishedMessages = [];
const consumedMessages = [];
let RabbitMQConnection = class RabbitMQConnection {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async createConnection(options) {
        var _a, _b;
        if (!connection || !connection == undefined) {
            try {
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
let Publisher = class Publisher {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async publishMessage(message) {
        const rabbitMQConnection = tsyringe_1.container.resolve(RabbitMQConnection);
        const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
        const tracer = await openTelemetryTracer.createTracer('rabbitmq-publisher');
        try {
            await (0, async_retry_1.default)(async () => {
                const channel = await rabbitMQConnection.getChannel();
                const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
                const serializedMessage = (0, serialization_1.serializeObject)(message);
                const span = tracer.startSpan(`publish_message_${exchangeName}`);
                await channel.assertExchange(exchangeName, 'fanout', { durable: false });
                const messageProperties = {
                    messageId: (0, uuid_1.v4)().toString(),
                    timestamp: (0, date_fns_1.getUnixTime)(new Date()),
                    contentType: 'application/json',
                    exchange: exchangeName,
                    type: 'fanout'
                };
                channel.publish(exchangeName, '', Buffer.from(serializedMessage), {
                    headers: messageProperties
                });
                this.logger.info(`Message: ${serializedMessage} sent with exchange name "${exchangeName}"`);
                publishedMessages.push(exchangeName);
                span.setAttributes(messageProperties);
                span.end();
            }, {
                retries: config_1.default.retry.count,
                factor: config_1.default.retry.factor,
                minTimeout: config_1.default.retry.minTimeout,
                maxTimeout: config_1.default.retry.maxTimeout
            });
        }
        catch (error) {
            this.logger.error(error);
            await rabbitMQConnection.closeChanel();
        }
    }
    async isPublished(message) {
        const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
        const isPublished = publishedMessages.includes(exchangeName);
        return Promise.resolve(isPublished);
    }
};
exports.Publisher = Publisher;
exports.Publisher = Publisher = __decorate([
    (0, tsyringe_1.injectable)()
], Publisher);
let Consumer = class Consumer {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async consumeMessage(type, handler) {
        const rabbitMQConnection = tsyringe_1.container.resolve(RabbitMQConnection);
        const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
        const tracer = await openTelemetryTracer.createTracer('rabbitmq-consumer');
        try {
            await (0, async_retry_1.default)(async () => {
                const channel = await rabbitMQConnection.getChannel();
                const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(type));
                await channel.assertExchange(exchangeName, 'fanout', { durable: false });
                const q = await channel.assertQueue('', { exclusive: true });
                await channel.bindQueue(q.queue, exchangeName, '');
                this.logger.info(`Waiting for messages with exchange name "${exchangeName}". To exit, press CTRL+C`);
                await channel.consume(q.queue, (message) => {
                    var _a;
                    if (message !== null) {
                        const span = tracer.startSpan(`receive_message_${exchangeName}`);
                        const messageContent = (_a = message === null || message === void 0 ? void 0 : message.content) === null || _a === void 0 ? void 0 : _a.toString();
                        const headers = message.properties.headers || {};
                        handler(q.queue, (0, serialization_1.deserializeObject)(messageContent));
                        this.logger.info(`Message: ${messageContent} delivered to queue: ${q.queue} with exchange name ${exchangeName}`);
                        channel.ack(message);
                        consumedMessages.push(exchangeName);
                        span.setAttributes(headers);
                        span.end();
                    }
                }, { noAck: false });
            }, {
                retries: config_1.default.retry.count,
                factor: config_1.default.retry.factor,
                minTimeout: config_1.default.retry.minTimeout,
                maxTimeout: config_1.default.retry.maxTimeout
            });
        }
        catch (error) {
            this.logger.error(error);
            await rabbitMQConnection.closeChanel();
        }
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    }
    async isConsumed(message) {
        const timeoutTime = 30000;
        const startTime = Date.now();
        let timeOutExpired = false;
        let isConsumed = false;
        while (true) {
            if (timeOutExpired) {
                return false;
            }
            if (isConsumed) {
                return true;
            }
            await (0, time_1.sleep)(2000);
            const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
            isConsumed = consumedMessages.includes(exchangeName);
            timeOutExpired = Date.now() - startTime > timeoutTime;
        }
    }
};
exports.Consumer = Consumer;
exports.Consumer = Consumer = __decorate([
    (0, tsyringe_1.injectable)()
], Consumer);
//# sourceMappingURL=rabbitmq.js.map