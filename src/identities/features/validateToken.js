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
exports.ValidateTokenHandler = exports.ValidateToken = void 0;
const config_1 = __importDefault(require("../../config/config"));
const dataSource_1 = require("../../data/dataSource");
const tokenType_1 = require("../enums/tokenType");
const mediatr_js_1 = require("../../mediatr.js");
const token_1 = require("../entities/token");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notFoundError_1 = __importDefault(require("../../types/notFoundError"));
class ValidateToken {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.ValidateToken = ValidateToken;
const generateTokenValidations = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer().required()
    })
};
const validateTokenValidations = joi_1.default.object({
    token: joi_1.default.string().required(),
    type: joi_1.default.string().required().valid(tokenType_1.TokenType.ACCESS, tokenType_1.TokenType.REFRESH)
});
class ValidateTokenHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateTokenValidations.validateAsync(request);
            const payload = jsonwebtoken_1.default.verify(request.token, config_1.default.jwt.secret);
            const userId = Number(payload.sub);
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            const tokenEntity = yield tokenRepository.findOneBy({
                token: request.token,
                type: request.type,
                userId: userId,
                blacklisted: false
            });
            if (!tokenEntity) {
                throw new notFoundError_1.default("Token not found");
            }
            return tokenEntity;
        });
    }
}
exports.ValidateTokenHandler = ValidateTokenHandler;
const validateTokenHandler = new ValidateTokenHandler();
mediatr_js_1.mediatrJs.registerHandler(ValidateToken, validateTokenHandler);
//# sourceMappingURL=validateToken.js.map