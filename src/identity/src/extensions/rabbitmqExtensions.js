"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRabbitmq = void 0;
const tsyringe_1 = require("tsyringe");
const rabbitmq_1 = require("building-blocks/rabbitmq/rabbitmq");
const publisher_1 = require("building-blocks/rabbitmq/publisher");
const initialRabbitmq = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const rabbitMQConnection = tsyringe_1.container.resolve(rabbitmq_1.RabbitMQConnection);
    yield rabbitMQConnection.createConnection(options);
    tsyringe_1.container.register('IPublisher', publisher_1.Publisher);
    return rabbitMQConnection;
});
exports.initialRabbitmq = initialRabbitmq;
//# sourceMappingURL=rabbitmqExtensions.js.map