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
exports.rabbitMqContainerStart = void 0;
require("reflect-metadata");
const testcontainers_1 = require("testcontainers");
const logger_1 = __importDefault(require("../../../logging/logger"));
const rabbitMqContainerStart = () => __awaiter(void 0, void 0, void 0, function* () {
    const defaultRabbitmqOptions = yield getDefaultRabbitmqTestContainers();
    const rabbitmqContainerStarted = yield getContainerStarted(defaultRabbitmqOptions);
    const containerPort = rabbitmqContainerStarted.getMappedPort(defaultRabbitmqOptions.port);
    const rabbitmqOptions = Object.assign(Object.assign({}, defaultRabbitmqOptions), { port: containerPort });
    logger_1.default.info(`Test rabbitmq with port ${rabbitmqOptions.port} established`);
    return [rabbitmqOptions, rabbitmqContainerStarted];
});
exports.rabbitMqContainerStart = rabbitMqContainerStart;
const getContainerStarted = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rabbitmqContainer = new testcontainers_1.GenericContainer(options.imageName)
        .withExposedPorts(options.port)
        .withEnvironment({ RABBITMQ_DEFAULT_USER: options.username })
        .withEnvironment({ RABBITMQ_DEFAULT_PASS: (_a = options.password) === null || _a === void 0 ? void 0 : _a.toString() });
    const rabbitmqContainerStarted = yield rabbitmqContainer.start();
    return rabbitmqContainerStarted;
});
const getDefaultRabbitmqTestContainers = () => __awaiter(void 0, void 0, void 0, function* () {
    const rabbitmqOptions = {
        port: 5672,
        host: 'localhost',
        username: 'guest',
        password: 'guest',
        imageName: 'rabbitmq:3-management'
    };
    return rabbitmqOptions;
});
//# sourceMappingURL=rabbitmqContainer.js.map