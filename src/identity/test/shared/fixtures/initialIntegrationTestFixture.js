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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialIntegrationTestFixture = exports.IntegrationTestFixture = void 0;
const postgresContainer_1 = require("building-blocks/test/container/postgres/postgresContainer");
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("../../../src/routes/routes");
const errorHandler_1 = require("building-blocks/middlewares/errorHandler");
const mediatrExtensions_1 = require("../../../src/extensions/mediatrExtensions");
const rabbitmqContainer_1 = require("building-blocks/test/container/rabbitmq/rabbitmqContainer");
const rabbitmq_1 = require("building-blocks/rabbitmq/rabbitmq");
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../../../src/data/repositories/userRepository");
const authRepository_1 = require("../../../src/data/repositories/authRepository");
const express_1 = __importDefault(require("express"));
const rabbitmqExtensions_1 = require("../../../src/extensions/rabbitmqExtensions");
const dbContext_1 = require("../../../src/data/dbContext");
class IntegrationTestFixture {
}
exports.IntegrationTestFixture = IntegrationTestFixture;
const initialIntegrationTestFixture = () => __awaiter(void 0, void 0, void 0, function* () {
    const integrationFixture = new IntegrationTestFixture();
    const [pgOptions, pgContainer] = yield (0, postgresContainer_1.postgresContainerStart)();
    integrationFixture.postgresContainer = pgContainer;
    const [rabbitOptions, rabbitContainer] = yield (0, rabbitmqContainer_1.rabbitMqContainerStart)();
    integrationFixture.rabbitmqContainer = rabbitContainer;
    integrationFixture.app = (0, express_1.default)();
    integrationFixture.databaseConnection = yield (0, dbContext_1.initialDbContext)(pgOptions);
    integrationFixture.app.use(express_1.default.json());
    integrationFixture.app.use(express_1.default.urlencoded({ extended: true }));
    integrationFixture.app.use(passport_1.default.initialize());
    (0, routes_1.RegisterRoutes)(integrationFixture.app);
    integrationFixture.app.use(errorHandler_1.errorHandler);
    integrationFixture.rabbitMQConnection = yield (0, rabbitmqExtensions_1.initialRabbitmq)(rabbitOptions);
    yield (0, mediatrExtensions_1.registerMediatrHandlers)();
    integrationFixture.userRepository = tsyringe_1.container.resolve(userRepository_1.UserRepository);
    integrationFixture.authRepository = tsyringe_1.container.resolve(authRepository_1.AuthRepository);
    integrationFixture.publisher = tsyringe_1.container.resolve(rabbitmq_1.Publisher);
    integrationFixture.consumer = tsyringe_1.container.resolve(rabbitmq_1.Consumer);
    return integrationFixture;
});
exports.initialIntegrationTestFixture = initialIntegrationTestFixture;
//# sourceMappingURL=initialIntegrationTestFixture.js.map
