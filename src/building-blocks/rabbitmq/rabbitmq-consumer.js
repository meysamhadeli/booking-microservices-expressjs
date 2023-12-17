"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
const async_retry_1 = __importDefault(require("async-retry"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
const reflection_1 = require("../utils/reflection");
const serialization_1 = require("../utils/serialization");
const lodash_1 = require("lodash");
const time_1 = require("../utils/time");
const logger_1 = require("../logging/logger");
const open_telemetry_1 = require("../open-telemetry/open-telemetry");
const rabbitmq_connection_1 = require("./rabbitmq-connection");
const consumedMessages = [];
let Consumer = class Consumer {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async consumeMessage(type, handler) {
        const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_connection_1.RabbitMQConnection);
        const openTelemetryTracer = tsyringe_1.container.resolve(open_telemetry_1.OpenTelemetryTracer);
        const tracer = await openTelemetryTracer.createTracer(x => x.serviceName = 'rabbitmq-consumer');
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
//# sourceMappingURL=rabbitmq-consumer.js.map