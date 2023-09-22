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
exports.LogoutHandler = exports.LogoutController = exports.Logout = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const tokenType_1 = require("../../enums/tokenType");
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/notFoundException"));
const authRepository_1 = require("../../../data/repositories/authRepository");
const tsyringe_1 = require("tsyringe");
class Logout {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.Logout = Logout;
const logoutValidations = {
    params: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
let LogoutController = class LogoutController extends tsoa_1.Controller {
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mediatr_js_1.mediatrJs.send(new Logout({ refreshToken: refreshToken }));
            this.setStatus(http_status_1.default.NO_CONTENT);
        });
    }
};
exports.LogoutController = LogoutController;
__decorate([
    (0, tsoa_1.Post)('v1/logout'),
    (0, tsoa_1.SuccessResponse)('204', 'NO_CONTENT'),
    __param(0, (0, tsoa_1.BodyProp)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogoutController.prototype, "logout", null);
exports.LogoutController = LogoutController = __decorate([
    (0, tsoa_1.Route)('/identity')
], LogoutController);
let LogoutHandler = class LogoutHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield logoutValidations.params.validateAsync(request);
            const authRepository = new authRepository_1.AuthRepository();
            const token = yield authRepository.findToken(request.refreshToken, tokenType_1.TokenType.REFRESH);
            if (!token) {
                throw new notFoundException_1.default('Refresh Token Not found');
            }
            const tokenEntity = yield authRepository.removeToken(token);
            return tokenEntity === null || tokenEntity === void 0 ? void 0 : tokenEntity.userId;
        });
    }
};
exports.LogoutHandler = LogoutHandler;
exports.LogoutHandler = LogoutHandler = __decorate([
    (0, tsyringe_1.injectable)()
], LogoutHandler);
//# sourceMappingURL=logout.js.map