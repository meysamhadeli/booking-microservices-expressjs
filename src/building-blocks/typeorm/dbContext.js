"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSourceOptions = {
                type: options.type,
                host: options.host,
                port: options.port,
                username: options.username,
                password: options.password,
                database: options.database,
                synchronize: options === null || options === void 0 ? void 0 : options.synchronize,
                entities: ['src/**/entities/*.js'],
                migrations: ['src/**/migrations/*.js'],
                logging: false
            };
            try {
                connection = yield (0, typeorm_1.createConnection)(dataSourceOptions);
                if (config_1.default.env !== 'test') {
                    yield connection.runMigrations(); // Fixed this line
                    this.logger.info('Migrations run successfully!');
                }
                return connection;
            }
            catch (error) {
                throw new Error(`Error during database initialization: ${error.toString()}`);
            }
        });
    }
    get connection() {
        return connection;
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.destroy();
        });
    }
};
exports.DbContext = DbContext;
exports.DbContext = DbContext = __decorate([
    (0, tsyringe_1.injectable)()
], DbContext);
//# sourceMappingURL=dbContext.js.map