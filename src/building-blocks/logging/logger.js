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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importStar(require("winston"));
const api_logs_1 = require("@opentelemetry/api-logs");
const api_logs_2 = require("@opentelemetry/api-logs");
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
let Logger = class Logger {
    static { Logger_1 = this; }
    static logger;
    constructor() {
        Logger_1.logger = winston_1.default.createLogger({
            level: config_1.default.env === 'development' ? 'debug' : 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
            transports: [new winston_1.default.transports.Console()]
        });
    }
    static debug(message, ...meta) {
        Logger_1.logger.debug(message, ...meta);
        this.emit(api_logs_1.SeverityNumber.DEBUG, 'DEBUG', message, meta);
    }
    debug(message, ...meta) {
        Logger_1.logger.debug(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.DEBUG, 'DEBUG', message, meta);
    }
    static info(message, ...meta) {
        Logger_1.logger.info(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.INFO, 'INFO', message, meta);
    }
    info(message, ...meta) {
        Logger_1.logger.info(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.INFO, 'INFO', message, meta);
    }
    static warn(message, ...meta) {
        Logger_1.logger.warn(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.WARN, 'WARN', message, meta);
    }
    warn(message, ...meta) {
        Logger_1.logger.warn(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.WARN, 'WARN', message, meta);
    }
    static error(message, ...meta) {
        const { errorMessage, fullMessage } = this.formatError(message);
        Logger_1.logger.error(errorMessage, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.ERROR, 'ERROR', fullMessage, meta);
    }
    error(message, ...meta) {
        const { errorMessage, fullMessage } = Logger_1.formatError(message);
        Logger_1.logger.error(errorMessage, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.ERROR, 'ERROR', fullMessage, meta);
    }
    static verbose(message, ...meta) {
        Logger_1.logger.verbose(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.TRACE, 'VERBOSE', message, meta);
    }
    verbose(message, ...meta) {
        Logger_1.logger.verbose(message, ...meta);
        Logger_1.emit(api_logs_1.SeverityNumber.TRACE, 'VERBOSE', message, meta);
    }
    static formatError(message) {
        const errorMessage = message instanceof Error ? message.message : message;
        const stack = message instanceof Error ? message.stack : undefined;
        const fullMessage = stack
            ? `${errorMessage}\n${stack}`
            : errorMessage;
        return { errorMessage, fullMessage };
    }
    static emit(severityNumber, severityText, message, meta = []) {
        try {
            const loggerProvider = api_logs_2.logs.getLoggerProvider();
            if (!loggerProvider) {
                Logger_1.logger.warn('OpenTelemetry logger provider not initialized');
                return;
            }
            const logger = api_logs_2.logs.getLogger(config_1.default.opentelemetry?.serviceName || 'default-service', config_1.default.opentelemetry?.serviceVersion || '1.0.0');
            let formattedMessage = String(message);
            if (meta && meta.length > 0) {
                formattedMessage +=
                    ' ' +
                        meta
                            .map((param) => param === null || param === undefined
                            ? 'null'
                            : typeof param === 'object'
                                ? JSON.stringify(param)
                                : String(param))
                            .join(' ');
            }
            const attributes = meta.reduce((attrs, param, idx) => {
                if (param === null || param === undefined) {
                    attrs[`meta_${idx}`] = 'null';
                }
                else if (typeof param === 'object') {
                    attrs[`meta_${idx}`] = JSON.stringify(param);
                }
                else {
                    attrs[`meta_${idx}`] = String(param);
                }
                return attrs;
            }, {});
            logger.emit({
                severityNumber,
                severityText,
                body: formattedMessage,
                attributes
            });
        }
        catch (error) {
            Logger_1.logger.error('OpenTelemetry log emission failed:', error);
        }
    }
};
exports.Logger = Logger;
exports.Logger = Logger = Logger_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
//# sourceMappingURL=logger.js.map