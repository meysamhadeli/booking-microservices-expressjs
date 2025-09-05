"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresContainerStart = void 0;
require("reflect-metadata");
const testcontainers_1 = require("testcontainers");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../../../logging/logger");
const postgresContainerStart = async () => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    const defaultPostgresOptions = await getDefaultPostgresTestContainers();
    const pgContainerStarted = await getContainerStarted(defaultPostgresOptions);
    const containerPort = pgContainerStarted.getMappedPort(defaultPostgresOptions.port);
    const postgresConnectionOption = {
        ...defaultPostgresOptions,
        type: 'postgres',
        port: containerPort
    };
    logger.info(`Test postgres with port ${postgresConnectionOption.port} established`);
    return [postgresConnectionOption, pgContainerStarted];
};
exports.postgresContainerStart = postgresContainerStart;
const getContainerStarted = async (options) => {
    const pgContainer = new testcontainers_1.GenericContainer(options.imageName)
        .withExposedPorts(options.port)
        .withEnvironment({ POSTGRES_USER: options.username })
        .withEnvironment({ POSTGRES_PASSWORD: options.password?.toString() })
        .withEnvironment({ POSTGRES_DB: options.database });
    const pgContainerStarted = await pgContainer.start();
    return pgContainerStarted;
};
const getDefaultPostgresTestContainers = async () => {
    const postgresOptions = {
        type: 'postgres',
        database: 'test_db',
        port: 5432,
        host: 'localhost',
        username: 'testcontainers',
        password: 'testcontainers',
        imageName: 'postgres:latest',
        synchronize: true,
        entities: ['src/**/entities/*.{js,ts}']
    };
    return postgresOptions;
};
//# sourceMappingURL=postgres-container.js.map