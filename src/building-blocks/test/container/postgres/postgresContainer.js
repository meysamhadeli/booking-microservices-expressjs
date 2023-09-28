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
exports.postgresContainerStart = void 0;
require("reflect-metadata");
const testcontainers_1 = require("testcontainers");
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../../../logging/logger");
const postgresContainerStart = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    const defaultPostgresOptions = yield getDefaultPostgresTestContainers();
    const pgContainerStarted = yield getContainerStarted(defaultPostgresOptions);
    const containerPort = pgContainerStarted.getMappedPort(defaultPostgresOptions.port);
    const postgresConnectionOption = Object.assign(Object.assign({}, defaultPostgresOptions), { type: 'postgres', port: containerPort });
    logger.info(`Test postgres with port ${postgresConnectionOption.port} established`);
    return [postgresConnectionOption, pgContainerStarted];
});
exports.postgresContainerStart = postgresContainerStart;
const getContainerStarted = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const pgContainer = new testcontainers_1.GenericContainer(options.imageName)
        .withExposedPorts(options.port)
        .withEnvironment({ POSTGRES_USER: options.username })
        .withEnvironment({ POSTGRES_PASSWORD: (_a = options.password) === null || _a === void 0 ? void 0 : _a.toString() })
        .withEnvironment({ POSTGRES_DB: options.database });
    const pgContainerStarted = yield pgContainer.start();
    return pgContainerStarted;
});
const getDefaultPostgresTestContainers = () => __awaiter(void 0, void 0, void 0, function* () {
    const postgresOptions = {
        type: 'postgres',
        database: 'test_db',
        port: 5432,
        host: 'localhost',
        username: 'testcontainers',
        password: 'testcontainers',
        imageName: 'postgres:latest',
        synchronize: true
    };
    return postgresOptions;
});
//# sourceMappingURL=postgresContainer.js.map