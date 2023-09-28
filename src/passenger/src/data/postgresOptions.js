"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresOptions = void 0;
const config_1 = __importDefault(require("building-blocks/config/config"));
const typeorm_1 = require("typeorm");
// use this file for running migration
exports.postgresOptions = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.default.postgres.host,
    port: config_1.default.postgres.port,
    username: config_1.default.postgres.username,
    password: config_1.default.postgres.password,
    database: config_1.default.postgres.database,
    synchronize: config_1.default.postgres.synchronize,
    entities: [config_1.default.postgres.entities],
    migrations: [config_1.default.postgres.migrations],
    logging: config_1.default.postgres.logging
});
//# sourceMappingURL=postgresOptions.js.map