"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.RabbitMQConnection = void 0;
const amqp = __importStar(require("amqplib"));
const async_retry_1 = __importDefault(require("async-retry"));
const logger_1 = __importDefault(require("../logging/logger"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
let RabbitMQConnection = class RabbitMQConnection {
    constructor() {
        this.connection = null;
        this.channel = null;
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection || !this.connection == undefined) {
                try {
                    yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                        this.connection = yield amqp.connect(`amqp://${config_1.default.rabbitmq.host}:${config_1.default.rabbitmq.port}`, {
                            username: config_1.default.rabbitmq.userName,
                            password: config_1.default.rabbitmq.password,
                        });
                        logger_1.default.info("RabbitMq connection created successfully");
                    }), {
                        retries: config_1.default.retry.count,
                        factor: config_1.default.retry.factor,
                        minTimeout: config_1.default.retry.minTimeout,
                        maxTimeout: config_1.default.retry.maxTimeout
                    });
                }
                catch (error) {
                    logger_1.default.error('RabbitMq connection failed!');
                }
            }
            return this.connection;
        });
    }
    getChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.connection) {
                    yield this.createConnection();
                }
                if ((this.connection && !this.channel) || !this.channel) {
                    yield (0, async_retry_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                        this.channel = yield this.connection.createChannel();
                        logger_1.default.info('Channel Created successfully');
                    }), {
                        retries: config_1.default.retry.count,
                        factor: config_1.default.retry.factor,
                        minTimeout: config_1.default.retry.minTimeout,
                        maxTimeout: config_1.default.retry.maxTimeout
                    });
                }
                return this.channel;
            }
            catch (error) {
                logger_1.default.error('Failed to get channel!');
            }
        });
    }
    closeChanel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                    logger_1.default.info('Channel closed successfully');
                }
            }
            catch (error) {
                logger_1.default.error('Channel close failed!');
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connection) {
                    yield this.connection.close();
                    logger_1.default.info('Connection closed successfully');
                }
            }
            catch (error) {
                logger_1.default.error('Connection close failed!');
            }
        });
    }
};
exports.RabbitMQConnection = RabbitMQConnection;
exports.RabbitMQConnection = RabbitMQConnection = __decorate([
    (0, tsyringe_1.singleton)()
], RabbitMQConnection);
//# sourceMappingURL=rabbitmq.js.map