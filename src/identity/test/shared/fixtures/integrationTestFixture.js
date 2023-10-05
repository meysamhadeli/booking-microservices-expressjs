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
exports.IntegrationTestFixture = exports.Fixture = void 0;
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
class Fixture {
}
exports.Fixture = Fixture;
class IntegrationTestFixture {
    constructor() {
        this.fixture = new Fixture();
    }
    initilizeFixture() {
        return __awaiter(this, void 0, void 0, function* () {
            const [pgOptions, pgContainer] = yield (0, postgresContainer_1.postgresContainerStart)();
            this.fixture.postgresContainer = pgContainer;
            const [rabbitOptions, rabbitContainer] = yield (0, rabbitmqContainer_1.rabbitMqContainerStart)();
            this.fixture.rabbitmqContainer = rabbitContainer;
            this.fixture.app = (0, express_1.default)();
            this.fixture.databaseConnection = yield (0, dbContext_1.initialDbContext)(pgOptions);
            this.fixture.app.use(express_1.default.json());
            this.fixture.app.use(express_1.default.urlencoded({ extended: true }));
            this.fixture.app.use(passport_1.default.initialize());
            (0, routes_1.RegisterRoutes)(this.fixture.app);
            this.fixture.app.use(errorHandler_1.errorHandler);
            this.fixture.rabbitMQConnection = yield (0, rabbitmqExtensions_1.initialRabbitmq)(rabbitOptions);
            this.fixture.userRepository = tsyringe_1.container.resolve(userRepository_1.UserRepository);
            this.fixture.authRepository = tsyringe_1.container.resolve(authRepository_1.AuthRepository);
            this.fixture.publisher = tsyringe_1.container.resolve(rabbitmq_1.Publisher);
            this.fixture.consumer = tsyringe_1.container.resolve(rabbitmq_1.Consumer);
            yield (0, mediatrExtensions_1.registerMediatrHandlers)();
            return this.fixture;
        });
    }
    cleanUp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fixture.postgresContainer.stop();
            yield this.fixture.rabbitmqContainer.stop();
        });
    }
}
exports.IntegrationTestFixture = IntegrationTestFixture;
//# sourceMappingURL=integrationTestFixture.js.map