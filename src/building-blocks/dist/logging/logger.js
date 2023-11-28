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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importStar(require("winston"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
let Logger = class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: config_1.default.env === 'development' ? 'debug' : 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.align(), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
            transports: [new winston_1.default.transports.Console()]
        });
    }
    debug(message) {
        this.logger.debug(message);
    }
    info(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
};
exports.Logger = Logger;
exports.Logger = Logger = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
//# sourceMappingURL=logger.js.map