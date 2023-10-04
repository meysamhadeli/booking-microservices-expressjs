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
exports.LoginHandler = exports.LoginController = exports.LoginRequestDto = exports.Login = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const generateToken_1 = require("../generateToken/generateToken");
const validation_1 = require("building-blocks/utils/validation");
const encryption_1 = require("building-blocks/utils/encryption");
const tsyringe_1 = require("tsyringe");
const applicationException_1 = __importDefault(require("building-blocks/types/exception/applicationException"));
class Login {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.Login = Login;
class LoginRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.LoginRequestDto = LoginRequestDto;
const loginValidations = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().custom(validation_1.password)
});
let LoginController = class LoginController extends tsoa_1.Controller {
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new Login(request));
            return result;
        });
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, tsoa_1.Post)('v1/login'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequestDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
exports.LoginController = LoginController = __decorate([
    (0, tsoa_1.Route)('/identity')
], LoginController);
let LoginHandler = class LoginHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield loginValidations.validateAsync(request);
            const user = yield this.userRepository.findUserByEmail(request.email);
            if (!user || !(yield (0, encryption_1.isPasswordMatch)(request.password, user.password))) {
                throw new applicationException_1.default('Incorrect email or password');
            }
            const token = yield mediatr_js_1.mediatrJs.send(new generateToken_1.GenerateToken({ userId: user.id }));
            return token;
        });
    }
};
exports.LoginHandler = LoginHandler;
exports.LoginHandler = LoginHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], LoginHandler);
//# sourceMappingURL=login.js.map