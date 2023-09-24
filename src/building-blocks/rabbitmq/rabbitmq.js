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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = exports.Publisher = exports.RabbitMQConnection = void 0;
const amqp = __importStar(require("amqplib"));
const async_retry_1 = __importDefault(require("async-retry"));
const logger_1 = __importDefault(require("../logging/logger"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
const otel_1 = require("../openTelemetry/otel");
const reflection_1 = require("../utils/reflection");
const serialization_1 = require("../utils/serialization");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const time_1 = require("../utils/time");
const uuid_1 = require("uuid");
let connection = null;
let channel = null;
const publishedMessages = [];
const consumedMessages = [];
let RabbitMQConnection = class RabbitMQConnection {
    createConnection(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection || !connection == undefined) {
                try {
                    yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                        connection = yield amqp.connect(`amqp://${options.host}:${options.port}`, {
                            username: options.username,
                            password: options.password
                        });
                        logger_1.default.info('RabbitMq connection created successfully');
                    }), {
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
        });
    }
    getChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!connection) {
                    throw new Error('Rabbitmq connection is failed!');
                }
                if ((connection && !channel) || !channel) {
                    yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                        channel = yield connection.createChannel();
                        logger_1.default.info('Channel Created successfully');
                    }), {
                        retries: config_1.default.retry.count,
                        factor: config_1.default.retry.factor,
                        minTimeout: config_1.default.retry.minTimeout,
                        maxTimeout: config_1.default.retry.maxTimeout
                    });
                }
                return channel;
            }
            catch (error) {
                logger_1.default.error('Failed to get channel!');
            }
        });
    }
    closeChanel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (channel) {
                    yield channel.close();
                    logger_1.default.info('Channel closed successfully');
                }
            }
            catch (error) {
                logger_1.default.error('Channel close failed!');
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection) {
                    yield connection.close();
                    logger_1.default.info('Connection closed successfully');
                }
            }
            catch (error) {
                logger_1.default.error('Connection close failed!');
            }
        });
    }
};
exports.RabbitMQConnection = RabbitMQConnection;
exports.RabbitMQConnection = RabbitMQConnection = __decorate([
    (0, tsyringe_1.singleton)()
], RabbitMQConnection);
let Publisher = class Publisher {
    publishMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const rabbitMQConnection = tsyringe_1.container.resolve(RabbitMQConnection);
            const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
            const tracer = yield openTelemetryTracer.createTracer('rabbitmq-publisher');
            try {
                yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                    const channel = yield rabbitMQConnection.getChannel();
                    const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
                    const routingKey = exchangeName;
                    const serializedMessage = (0, serialization_1.serializeObject)(message);
                    // Start a new span for this RabbitMQ operation
                    const span = tracer.startSpan(`publish_message_${exchangeName}`);
                    yield channel.assertExchange(exchangeName, 'topic', { durable: false });
                    // Create custom message properties
                    const messageProperties = {
                        messageId: (0, uuid_1.v4)().toString(),
                        timestamp: (0, date_fns_1.getUnixTime)(new Date()),
                        contentType: 'application/json',
                        exchange: exchangeName,
                        routingKey: routingKey,
                        type: 'topic'
                    };
                    channel.publish(exchangeName, routingKey, Buffer.from(serializedMessage), {
                        headers: messageProperties
                    });
                    logger_1.default.info(`Message: ${serializedMessage} sent with routing key "${routingKey}"`);
                    publishedMessages.push(exchangeName);
                    // Set attributes on the span
                    span.setAttributes(messageProperties);
                    // Ensure the span ends when this operation is complete
                    span.end();
                }), {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
            }
            catch (error) {
                logger_1.default.error(error);
                yield rabbitMQConnection.closeChanel();
            }
        });
    }
    isPublished(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageType = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
            const isPublished = publishedMessages.includes(messageType);
            return Promise.resolve(isPublished);
        });
    }
};
exports.Publisher = Publisher;
exports.Publisher = Publisher = __decorate([
    (0, tsyringe_1.injectable)()
], Publisher);
let Consumer = class Consumer {
    consumeMessage(type, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const rabbitMQConnection = tsyringe_1.container.resolve(RabbitMQConnection);
            const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
            const tracer = yield openTelemetryTracer.createTracer('rabbitmq-consumer');
            try {
                yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                    const channel = yield rabbitMQConnection.getChannel();
                    const exchangeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(type));
                    // Declare the exchange as 'topic' to enable topic-based routing
                    yield channel.assertExchange(exchangeName, 'topic', { durable: false });
                    // Define a unique queue name for this subscriber
                    const queueName = `${exchangeName}_queue`;
                    const bindingKey = exchangeName;
                    // Create a queue and bind it to the exchange with the specified binding key
                    yield channel.assertQueue(queueName, { exclusive: true });
                    yield channel.bindQueue(queueName, exchangeName, bindingKey);
                    logger_1.default.info(`Waiting for messages with binding key "${bindingKey}". To exit, press CTRL+C`);
                    // Consume messages from the queue
                    yield channel.consume(queueName, (message) => {
                        var _a;
                        if (message !== null) {
                            // Start a new span for this RabbitMQ operation
                            const span = tracer.startSpan(`receive_message_${exchangeName}`);
                            const messageContent = (_a = message === null || message === void 0 ? void 0 : message.content) === null || _a === void 0 ? void 0 : _a.toString();
                            const headers = message.properties.headers || {};
                            handler(queueName, (0, serialization_1.deserializeObject)(messageContent));
                            logger_1.default.info(`Message: ${messageContent} delivered to queue: ${queueName}`);
                            channel.ack(message); // Acknowledge the message
                            consumedMessages.push(exchangeName);
                            // Set attributes on the span
                            span.setAttributes(headers);
                            // End the message handling span
                            span.end();
                        }
                    }, { noAck: false } // Ensure that we acknowledge messages
                    );
                }), {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
            }
            catch (error) {
                logger_1.default.error(error);
                yield rabbitMQConnection.closeChanel();
            }
            const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        });
    }
    isConsumed(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeoutTime = 20000; // 20 seconds in milliseconds
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
                yield (0, time_1.sleep)(2000);
                const typeName = (0, lodash_1.snakeCase)((0, reflection_1.getTypeName)(message));
                isConsumed = consumedMessages.includes(typeName);
                timeOutExpired = Date.now() - startTime > timeoutTime;
            }
        });
    }
};
exports.Consumer = Consumer;
exports.Consumer = Consumer = __decorate([
    (0, tsyringe_1.injectable)()
], Consumer);
//# sourceMappingURL=rabbitmq.js.map