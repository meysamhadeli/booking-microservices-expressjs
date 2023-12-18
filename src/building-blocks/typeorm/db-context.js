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
    async initializeTypeorm(dataSourceOptions) {
        try {
            connection = await new typeorm_1.DataSource(dataSourceOptions).initialize();
            logger_1.Logger.info('Data Source has been initialized!');
            if (config_1.default.env !== 'test') {
                try {
                }
                catch (error) {
                    logger_1.Logger.error('Error during running the Migrations!');
                }
                await connection.runMigrations();
                logger_1.Logger.info('Migrations run successfully!');
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
//# sourceMappingURL=db-context.js.map