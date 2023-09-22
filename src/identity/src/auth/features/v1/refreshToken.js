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
exports.RefreshTokenHandler = exports.RefreshTokenController = exports.RefreshToken = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const generateToken_1 = require("./generateToken");
const tokenType_1 = require("../../enums/tokenType");
const unauthorizedException_1 = __importDefault(require("building-blocks/types/exception/unauthorizedException"));
const validateToken_1 = require("./validateToken");
const authRepository_1 = require("../../../data/repositories/authRepository");
const tsyringe_1 = require("tsyringe");
class RefreshToken {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.RefreshToken = RefreshToken;
const refreshTokenValidations = {
    params: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
let RefreshTokenController = class RefreshTokenController extends tsoa_1.Controller {
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new RefreshToken({ refreshToken: refreshToken }));
            return result;
        });
    }
};
exports.RefreshTokenController = RefreshTokenController;
__decorate([
    (0, tsoa_1.Post)('v1/refreshToken'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.BodyProp)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "refreshToken", null);
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, tsoa_1.Route)('/identity')
], RefreshTokenController);
let RefreshTokenHandler = class RefreshTokenHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield refreshTokenValidations.params.validateAsync(request);
            try {
                const refreshTokenData = yield mediatr_js_1.mediatrJs.send(new validateToken_1.ValidateToken({
                    token: request.refreshToken,
                    type: tokenType_1.TokenType.REFRESH
                }));
                const { userId } = refreshTokenData;
                const authRepository = new authRepository_1.AuthRepository();
                yield authRepository.removeToken(refreshTokenData);
                const result = yield mediatr_js_1.mediatrJs.send(new generateToken_1.GenerateToken({ userId: userId }));
                return result;
            }
            catch (error) {
                throw new unauthorizedException_1.default('Please authenticate');
            }
        });
    }
};
exports.RefreshTokenHandler = RefreshTokenHandler;
exports.RefreshTokenHandler = RefreshTokenHandler = __decorate([
    (0, tsyringe_1.injectable)()
], RefreshTokenHandler);
//# sourceMappingURL=refreshToken.js.map