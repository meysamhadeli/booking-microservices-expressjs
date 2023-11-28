"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config/config"));
const logger_1 = require("../logging/logger");
const tsyringe_1 = require("tsyringe");
let connection = null;
let DbContext = class DbContext {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    async initialize(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const dataSourceOptions = {
            type: 'postgres',
            host: (_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : config_1.default.postgres.host,
            port: (_b = options === null || options === void 0 ? void 0 : options.port) !== null && _b !== void 0 ? _b : config_1.default.postgres.port,
            username: (_c = options === null || options === void 0 ? void 0 : options.username) !== null && _c !== void 0 ? _c : config_1.default.postgres.username,
            password: (_d = options === null || options === void 0 ? void 0 : options.password) !== null && _d !== void 0 ? _d : config_1.default.postgres.password,
            database: (_e = options === null || options === void 0 ? void 0 : options.database) !== null && _e !== void 0 ? _e : config_1.default.postgres.database,
            logging: (_f = options === null || options === void 0 ? void 0 : options.logging) !== null && _f !== void 0 ? _f : false,
            synchronize: (_g = options === null || options === void 0 ? void 0 : options.synchronize) !== null && _g !== void 0 ? _g : config_1.default.postgres.synchronize,
            entities: [(_h = options === null || options === void 0 ? void 0 : options.entities) !== null && _h !== void 0 ? _h : (_j = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.postgres) === null || _j === void 0 ? void 0 : _j.entities],
            migrations: [(_k = options === null || options === void 0 ? void 0 : options.migrations) !== null && _k !== void 0 ? _k : (_l = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.postgres) === null || _l === void 0 ? void 0 : _l.migrations]
        };
        try {
            connection = await (0, typeorm_1.createConnection)(dataSourceOptions);
            this.logger.info('Data Source has been initialized!');
            if (config_1.default.env !== 'test') {
                connection
                    .runMigrations()
                    .then(() => {
                    this.logger.info('Migrations run successfully!');
                })
                    .catch((err) => {
                    this.logger.error('Error during running the Migrations!');
                });
            }
        }
        catch (error) {
            throw new Error(`Error during database initialization: ${error.toString()}`);
        }
        return connection;
    }
    get connection() {
        return connection;
    }
    async closeConnection() {
        await connection.destroy();
    }
};
exports.DbContext = DbContext;
exports.DbContext = DbContext = __decorate([
    (0, tsyringe_1.injectable)()
], DbContext);
//# sourceMappingURL=dbContext.js.map