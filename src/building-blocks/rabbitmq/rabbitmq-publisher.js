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
exports.Publisher = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../logging/logger");
const open_telemetry_1 = require("../open-telemetry/open-telemetry");
const reflection_1 = require("../utils/reflection");
const serialization_1 = require("../utils/serialization");
const date_fns_1 = require("date-fns");
const config_1 = __importDefault(require("../config/config"));
const rabbitmq_connection_1 = require("./rabbitmq-connection");
const async_retry_1 = __importDefault(require("async-retry"));
const StringUtils_1 = require("typeorm/util/StringUtils");
const uuid_1 = require("uuid");
const publishedMessages = [];
let Publisher = class Publisher {
    async publishMessage(message) {
        const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_connection_1.RabbitMQConnection);
        const openTelemetryTracer = tsyringe_1.container.resolve(open_telemetry_1.OpenTelemetryTracer);
        const tracer = await openTelemetryTracer.createTracer((x) => (x.serviceName = 'rabbitmq-publisher'));
        try {
            await (0, async_retry_1.default)(async () => {
                const channel = await rabbitMQConnection.getChannel();
                const exchangeName = (0, StringUtils_1.snakeCase)((0, reflection_1.getTypeName)(message));
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
                logger_1.Logger.info(`Message: ${serializedMessage} sent with exchange name "${exchangeName}"`);
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
            logger_1.Logger.error(error);
            await rabbitMQConnection.closeChanel();
        }
    }
    async isPublished(message) {
        const exchangeName = (0, StringUtils_1.snakeCase)((0, reflection_1.getTypeName)(message));
        const isPublished = publishedMessages.includes(exchangeName);
        return Promise.resolve(isPublished);
    }
};
exports.Publisher = Publisher;
exports.Publisher = Publisher = __decorate([
    (0, tsyringe_1.injectable)()
], Publisher);
//# sourceMappingURL=rabbitmq-publisher.js.map