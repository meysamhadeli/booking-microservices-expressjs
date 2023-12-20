"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rabbitmq = void 0;
const tsyringe_1 = require("tsyringe");
const rabbitmq_connection_1 = require("./rabbitmq-connection");
const rabbitmq_consumer_1 = require("./rabbitmq-consumer");
const rabbitmq_connection_options_builder_1 = require("./rabbitmq-connection-options-builder");
const rabbitmq_consumer_options_builder_1 = require("./rabbitmq-consumer-options-builder");
let Rabbitmq = class Rabbitmq {
    constructor() {
        this.rabbitmqConnection = tsyringe_1.container.resolve(rabbitmq_connection_1.RabbitMQConnection);
        this.rabbitmqConsumer = tsyringe_1.container.resolve(rabbitmq_consumer_1.Consumer);
    }
    async createConnection(rabbitmqConnectionOptionsBuilder) {
        if (rabbitmqConnectionOptionsBuilder) {
            const builder = new rabbitmq_connection_options_builder_1.RabbitmqConnectionOptionsBuilder();
            rabbitmqConnectionOptionsBuilder(builder);
            const connectionOptions = builder.build();
            await this.rabbitmqConnection.createConnection(connectionOptions);
        }
        return this;
    }
    async addConsumer(rabbitmqConsumerOptionsBuilder) {
        const builder = new rabbitmq_consumer_options_builder_1.RabbitmqConsumerOptionsBuilder();
        rabbitmqConsumerOptionsBuilder(builder);
        const consumersOptions = builder.build();
        await this.rabbitmqConsumer.addConsumer(consumersOptions);
        return this;
    }
};
exports.Rabbitmq = Rabbitmq;
exports.Rabbitmq = Rabbitmq = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Rabbitmq);
//# sourceMappingURL=rabbitmq.js.map