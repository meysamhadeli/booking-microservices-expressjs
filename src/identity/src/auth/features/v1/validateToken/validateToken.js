"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ValidateTokenHandler = exports.ValidateToken = void 0;
const tokenType_1 = require("../../../enums/tokenType");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("building-blocks/config/config"));
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/notFoundException"));
const tsyringe_1 = require("tsyringe");
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
let ValidateTokenHandler = class ValidateTokenHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateTokenValidations.validateAsync(request);
            const payload = jsonwebtoken_1.default.verify(request.token, config_1.default.jwt.secret);
            const userId = Number(payload.sub);
            const tokenEntity = yield this.authRepository.findTokenByUserId(request.token, request.type, userId, false);
            if (!tokenEntity) {
                throw new notFoundException_1.default('Token not found');
            }
            return tokenEntity;
        });
    }
};
exports.ValidateTokenHandler = ValidateTokenHandler;
exports.ValidateTokenHandler = ValidateTokenHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IAuthRepository')),
    __metadata("design:paramtypes", [Object])
], ValidateTokenHandler);
//# sourceMappingURL=validateToken.js.map