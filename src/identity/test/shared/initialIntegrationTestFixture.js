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
const dataSource_1 = require("../../src/data/dataSource");
const passport_1 = __importDefault(require("passport"));
const routes_1 = require("../../src/routes/routes");
const errorHandler_1 = require("building-blocks/middlewares/errorHandler");
const rabbitmqExtensions_1 = require("../../src/extensions/rabbitmqExtensions");
const mediatrExtensions_1 = require("../../src/extensions/mediatrExtensions");
const rabbitmqContainer_1 = require("building-blocks/test/container/rabbitmq/rabbitmqContainer");
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../../src/data/repositories/userRepository");
const authRepository_1 = require("../../src/data/repositories/authRepository");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("building-blocks/config/config"));
class IntegrationTestFixture {
}
exports.IntegrationTestFixture = IntegrationTestFixture;
const initialIntegrationTestFixture = () => __awaiter(void 0, void 0, void 0, function* () {
    const integrationFixture = new IntegrationTestFixture();
    const b = config_1.default.env;
    const t = config_1.default.postgres.synchronize;
    const [pgOptions, pgContainer] = yield (0, postgresContainer_1.postgresContainerStart)();
    integrationFixture.postgresContainer = pgContainer;
    const [rabbitOptions, rabbitContainer] = yield (0, rabbitmqContainer_1.rabbitMqContainerStart)();
    integrationFixture.rabbitmqContainer = rabbitContainer;
    const app = (0, express_1.default)();
    integrationFixture.databaseConnection = yield (0, dataSource_1.initialDatabase)(pgOptions);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(passport_1.default.initialize());
    (0, routes_1.RegisterRoutes)(app);
    app.use(errorHandler_1.errorHandler);
    integrationFixture.rabbitMQConnection = yield (0, rabbitmqExtensions_1.initialRabbitmq)(rabbitOptions);
    yield (0, mediatrExtensions_1.registerMediatrHandlers)();
    integrationFixture.userRepository = tsyringe_1.container.resolve(userRepository_1.UserRepository);
    integrationFixture.authRepository = tsyringe_1.container.resolve(authRepository_1.AuthRepository);
    return integrationFixture;
});
exports.initialIntegrationTestFixture = initialIntegrationTestFixture;
//# sourceMappingURL=initialIntegrationTestFixture.js.map