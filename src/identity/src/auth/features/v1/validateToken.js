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
const tokenType_1 = require("../../enums/tokenType");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("building-blocks/config/config"));
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/notFoundException"));
const authRepository_1 = require("../../../data/repositories/authRepository");
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
            const authRepository = new authRepository_1.AuthRepository();
            const tokenEntity = yield authRepository.findTokenByUserId(request.token, request.type, userId, false);
            if (!tokenEntity) {
                throw new notFoundException_1.default('Token not found');
            }
            return tokenEntity;
        });
    }
}
exports.ValidateTokenHandler = ValidateTokenHandler;
//# sourceMappingURL=validateToken.js.map