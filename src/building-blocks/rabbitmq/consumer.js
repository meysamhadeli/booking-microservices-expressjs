"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.Consumer = void 0;
const lodash_1 = require("lodash");
const async_retry_1 = __importDefault(require("async-retry"));
const reflection_1 = require("../utils/reflection");
const logger_1 = __importDefault(require("../logging/logger"));
const serialization_1 = require("../utils/serialization");
const config_1 = __importDefault(require("../config/config"));
const rabbitmq_1 = require("./rabbitmq");
const tsyringe_1 = require("tsyringe");
const otel_1 = require("../openTelemetry/otel");
let Consumer = class Consumer {
    consumeMessage(type, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_1.RabbitMQConnection);
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
        });
    }
};
exports.Consumer = Consumer;
exports.Consumer = Consumer = __decorate([
    (0, tsyringe_1.injectable)()
], Consumer);
//# sourceMappingURL=consumer.js.map