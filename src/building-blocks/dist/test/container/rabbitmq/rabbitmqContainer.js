"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMqContainerStart = void 0;
require("reflect-metadata");
const testcontainers_1 = require("testcontainers");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../../../logging/logger");
const rabbitMqContainerStart = async () => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    const defaultRabbitmqOptions = await getDefaultRabbitmqTestContainers();
    const rabbitmqContainerStarted = await getContainerStarted(defaultRabbitmqOptions);
    const containerPort = rabbitmqContainerStarted.getMappedPort(defaultRabbitmqOptions.port);
    const rabbitmqOptions = Object.assign(Object.assign({}, defaultRabbitmqOptions), { port: containerPort });
    logger.info(`Test rabbitmq with port ${rabbitmqOptions.port} established`);
    return [rabbitmqOptions, rabbitmqContainerStarted];
};
exports.rabbitMqContainerStart = rabbitMqContainerStart;
const getContainerStarted = async (options) => {
    var _a;
    const rabbitmqContainer = new testcontainers_1.GenericContainer(options.imageName)
        .withExposedPorts(options.port)
        .withEnvironment({ RABBITMQ_DEFAULT_USER: options.username })
        .withEnvironment({ RABBITMQ_DEFAULT_PASS: (_a = options.password) === null || _a === void 0 ? void 0 : _a.toString() });
    const rabbitmqContainerStarted = await rabbitmqContainer.start();
    return rabbitmqContainerStarted;
};
const getDefaultRabbitmqTestContainers = async () => {
    const rabbitmqOptions = {
        port: 5672,
        host: 'localhost',
        username: 'guest',
        password: 'guest',
        imageName: 'rabbitmq:3-management'
    };
    return rabbitmqOptions;
};
//# sourceMappingURL=rabbitmqContainer.js.map