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
exports.Publisher = void 0;
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const async_retry_1 = __importDefault(require("async-retry"));
const reflection_1 = require("../utils/reflection");
const serialization_1 = require("../utils/serialization");
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../logging/logger"));
const rabbitmq_1 = require("./rabbitmq");
const tsyringe_1 = require("tsyringe");
const otel_1 = require("../openTelemetry/otel");
let Publisher = class Publisher {
    publishMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_1.RabbitMQConnection);
            const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
            const tracer = yield openTelemetryTracer.createTracer("rabbitmq-publisher");
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
};
exports.Publisher = Publisher;
exports.Publisher = Publisher = __decorate([
    (0, tsyringe_1.injectable)()
], Publisher);
//# sourceMappingURL=publisher.js.map