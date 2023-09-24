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
exports.initialDatabase = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("building-blocks/config/config"));
const seedUser_1 = require("./seeds/seedUser");
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
const repositoryExtensions_1 = require("../extensions/repositoryExtensions");
exports.dataSource = null;
const initialDatabase = (options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const dataSourceOptions = {
        type: 'postgres',
        host: (_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : config_1.default.postgres.host,
        port: (_b = options === null || options === void 0 ? void 0 : options.port) !== null && _b !== void 0 ? _b : config_1.default.postgres.port,
        username: (_c = options === null || options === void 0 ? void 0 : options.username) !== null && _c !== void 0 ? _c : config_1.default.postgres.username,
        password: (_d = options === null || options === void 0 ? void 0 : options.password) !== null && _d !== void 0 ? _d : config_1.default.postgres.password,
        database: (_e = options === null || options === void 0 ? void 0 : options.database) !== null && _e !== void 0 ? _e : config_1.default.postgres.database,
        synchronize: (_f = options === null || options === void 0 ? void 0 : options.synchronize) !== null && _f !== void 0 ? _f : config_1.default.postgres.synchronize,
        entities: ['src/**/entities/*.js'],
        migrations: ['src/**/migrations/*.js'],
        logging: false
    };
    yield (0, typeorm_1.createConnection)(dataSourceOptions)
        .then((connection) => {
        exports.dataSource = connection;
        if (config_1.default.env !== 'test') {
            exports.dataSource
                .runMigrations()
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.default.info('Migrations run successfully!');
                yield (0, seedUser_1.seedUser)();
                return exports.dataSource;
            }))
                .catch((err) => {
                throw new Error('Error during running the Migrations!');
            });
        }
    })
        .catch((error) => {
        throw new Error(`Error during Data Source initialization: ${error.toString()}`);
    });
    yield (0, repositoryExtensions_1.registerRepositories)();
    return exports.dataSource;
});
exports.initialDatabase = initialDatabase;
//# sourceMappingURL=dataSource.js.map