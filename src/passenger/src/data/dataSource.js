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
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
exports.dataSource = null;
const initialDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataSourceOptions = {
        type: 'postgres',
        host: config_1.default.postgres.host,
        port: config_1.default.postgres.port,
        username: config_1.default.postgres.userName,
        password: config_1.default.postgres.password,
        database: config_1.default.postgres.database,
        entities: ['src/**/entities/*.js'],
        migrations: ['src/**/migrations/*.js'],
        synchronize: false,
        logging: false
    };
    yield (0, typeorm_1.createConnection)(dataSourceOptions)
        .then((connection) => {
        exports.dataSource = connection;
        exports.dataSource
            .runMigrations()
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.info('Migrations run successfully!');
            return exports.dataSource;
        }))
            .catch((err) => {
            throw new Error('Error during running the Migrations!');
        });
    })
        .catch((error) => {
        throw new Error(`Error during Data Source initialization: ${error.toString()}`);
    });
    return exports.dataSource;
});
exports.initialDatabase = initialDatabase;
//# sourceMappingURL=dataSource.js.map