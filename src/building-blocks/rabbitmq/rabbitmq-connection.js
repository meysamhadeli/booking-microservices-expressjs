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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConnection = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../logging/logger");
const amqp = __importStar(require("amqplib"));
const config_1 = __importDefault(require("../config/config"));
const async_retry_1 = __importDefault(require("async-retry"));
let connection = null;
let channel = null;
let RabbitMQConnection = class RabbitMQConnection {
    async createConnection(options) {
        if (!connection || !connection == undefined) {
            try {
                const rabbitConfig = {
                    protocol: 'amqp',
                    hostname: options?.host ?? config_1.default.rabbitmq.host,
                    port: options?.port ?? config_1.default.rabbitmq.port,
                    username: options?.username ?? config_1.default.rabbitmq.username,
                    password: options?.password ?? config_1.default.rabbitmq.password,
                };
                await (0, async_retry_1.default)(async () => {
                    connection = await amqp.connect(rabbitConfig);
                    logger_1.Logger.info('Rabbitmq connection created successfully');
                    process.on('SIGINT', async () => {
                        if (connection) {
                            await this.closeConnection();
                        }
                    });
                }, {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
                connection.on('error', async (error) => {
                    logger_1.Logger.error(`Error occurred on connection: ${error}`);
                    await this.closeConnection();
                    await this.createConnection();
                });
            }
            catch (error) {
                throw new Error('Rabbitmq connection is failed!');
            }
        }
        return connection;
    }
    async getConnection() {
        return connection;
    }
    async getChannel() {
        try {
            if (!connection) {
                throw new Error('Rabbitmq connection is failed!');
            }
            if ((connection && !channel) || !channel) {
                await (0, async_retry_1.default)(async () => {
                    channel = await connection.createChannel();
                    logger_1.Logger.info('Channel Created successfully');
                }, {
                    retries: config_1.default.retry.count,
                    factor: config_1.default.retry.factor,
                    minTimeout: config_1.default.retry.minTimeout,
                    maxTimeout: config_1.default.retry.maxTimeout
                });
            }
            channel.on('error', async (error) => {
                logger_1.Logger.error(`Error occurred on channel: ${error}`);
                await this.closeChanel();
                await this.getChannel();
            });
            return channel;
        }
        catch (error) {
            logger_1.Logger.error('Failed to get channel!');
        }
    }
    async closeChanel() {
        try {
            if (channel) {
                await channel.close();
                logger_1.Logger.info('Channel closed successfully');
            }
        }
        catch (error) {
            logger_1.Logger.error('Channel close failed!');
        }
    }
    async closeConnection() {
        try {
            if (connection) {
                await connection;
                logger_1.Logger.info('Connection rabbitmq closed gracefully!');
            }
        }
        catch (error) {
            logger_1.Logger.error('Connection rabbitmq close failed!');
        }
    }
};
exports.RabbitMQConnection = RabbitMQConnection;
exports.RabbitMQConnection = RabbitMQConnection = __decorate([
    (0, tsyringe_1.injectable)()
], RabbitMQConnection);
//# sourceMappingURL=rabbitmq-connection.js.map