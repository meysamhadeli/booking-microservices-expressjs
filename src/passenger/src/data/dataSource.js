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
exports.initialDataSource = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
const applicationException_1 = __importDefault(require("building-blocks/types/exception/applicationException"));
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'passenger',
    logging: true,
    synchronize: false,
    entities: ['src/**/entities/*.js'],
    migrations: ['src/data/migrations/*.js']
});
const initialDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.dataSource
        .initialize()
        .then(() => {
        logger_1.default.info('Data Source has been initialized!');
        exports.dataSource
            .runMigrations()
            .then(() => {
            logger_1.default.info('Migrations run successfully!');
        })
            .catch((err) => {
            throw new applicationException_1.default('Error during running the Migrations!');
        });
    })
        .catch((err) => {
        throw new applicationException_1.default('Error during Data Source initialization:', err);
    });
});
exports.initialDataSource = initialDataSource;
//# sourceMappingURL=dataSource.js.map