"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRabbitmq = void 0;
const tsyringe_1 = require("tsyringe");
const rabbitmq_1 = require("building-blocks/rabbitmq/rabbitmq");
const initialRabbitmq = async (options) => {
    const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_1.RabbitMQConnection);
    await rabbitMQConnection.createConnection(options);
    tsyringe_1.container.register('IPublisher', rabbitmq_1.Publisher);
    tsyringe_1.container.register('IConsumer', rabbitmq_1.Consumer);
    return rabbitMQConnection;
};
exports.initialRabbitmq = initialRabbitmq;
//# sourceMappingURL=rabbitmqExtensions.js.map