"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRabbitmq = void 0;
const tsyringe_1 = require("tsyringe");
const rabbitmq_1 = require("building-blocks/rabbitmq/rabbitmq");
const identityContract_1 = require("building-blocks/contracts/identity.contract");
const createUser_1 = require("../user/consumers/createUser");
const initialRabbitmq = async (options) => {
    const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_1.RabbitMQConnection);
    await rabbitMQConnection.createConnection(options);
    tsyringe_1.container.register('IPublisher', rabbitmq_1.Publisher);
    tsyringe_1.container.register('IConsumer', rabbitmq_1.Consumer);
    const consumers = tsyringe_1.container.resolve(rabbitmq_1.Consumer);
    await consumers.consumeMessage(new identityContract_1.UserCreated(), createUser_1.createUserConsumerHandler);
    return rabbitMQConnection;
};
exports.initialRabbitmq = initialRabbitmq;
//# sourceMappingURL=rabbitmqExtensions.js.map
