"use strict";
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
    database: 'node_express_template_db',
    logging: true,
    synchronize: false,
    entities: ['src/**/entities/*.js'],
    migrations: ['src/data/migrations/*.js']
});
const initialDataSource = () => {
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
};
exports.initialDataSource = initialDataSource;
//# sourceMappingURL=dataSource.js.map