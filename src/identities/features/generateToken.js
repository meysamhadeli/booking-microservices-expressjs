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
exports.GenerateTokenHandler = exports.GenerateToken = void 0;
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../../config/config"));
const encryption_1 = require("../../utils/encryption");
const dataSource_1 = require("../../data/dataSource");
const tokenType_1 = require("../enums/tokenType");
const mediatr_js_1 = require("../../mediatr.js");
const authDto_1 = require("../dtos/authDto");
const token_1 = require("../entities/token");
const joi_1 = __importDefault(require("joi"));
class GenerateToken {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.GenerateToken = GenerateToken;
const generateTokenValidations = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer().required()
    })
};
class GenerateTokenHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield generateTokenValidations.params.validateAsync(request);
            const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes');
            const accessToken = (0, encryption_1.generateJwtToken)(request.userId, accessTokenExpires.unix(), tokenType_1.TokenType.ACCESS);
            const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, 'days');
            const refreshToken = (0, encryption_1.generateJwtToken)(request.userId, refreshTokenExpires.unix(), tokenType_1.TokenType.REFRESH);
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            const token = {
                createdAt: new Date(),
                type: tokenType_1.TokenType.REFRESH,
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
                userId: request.userId,
                blacklisted: false
            };
            yield tokenRepository.save(token);
            const result = {
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.toDate()
                },
                refresh: {
                    token: refreshToken,
                    expires: refreshTokenExpires.toDate()
                }
            };
            return new authDto_1.AuthDto(result);
        });
    }
}
exports.GenerateTokenHandler = GenerateTokenHandler;
const generateTokenHandler = new GenerateTokenHandler();
mediatr_js_1.mediatrJs.registerHandler(GenerateToken, generateTokenHandler);
//# sourceMappingURL=generateToken.js.map