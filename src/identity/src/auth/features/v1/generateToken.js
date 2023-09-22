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
exports.GenerateTokenHandler = exports.GenerateToken = void 0;
const moment_1 = __importDefault(require("moment"));
const tokenType_1 = require("../../enums/tokenType");
const authDto_1 = require("../../dtos/authDto");
const token_1 = require("../../entities/token");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("building-blocks/config/config"));
const authRepository_1 = require("../../../data/repositories/authRepository");
const tsyringe_1 = require("tsyringe");
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
const generateJwtToken = (userId, expires, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires,
        type
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
let GenerateTokenHandler = class GenerateTokenHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield generateTokenValidations.params.validateAsync(request);
            const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes');
            const accessToken = generateJwtToken(request.userId, accessTokenExpires.unix(), tokenType_1.TokenType.ACCESS);
            const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, 'days');
            const refreshToken = generateJwtToken(request.userId, refreshTokenExpires.unix(), tokenType_1.TokenType.REFRESH);
            const authRepository = new authRepository_1.AuthRepository();
            yield authRepository.createToken(new token_1.Token(refreshToken, refreshTokenExpires.toDate(), tokenType_1.TokenType.REFRESH, false, request.userId));
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
};
exports.GenerateTokenHandler = GenerateTokenHandler;
exports.GenerateTokenHandler = GenerateTokenHandler = __decorate([
    (0, tsyringe_1.injectable)()
], GenerateTokenHandler);
//# sourceMappingURL=generateToken.js.map