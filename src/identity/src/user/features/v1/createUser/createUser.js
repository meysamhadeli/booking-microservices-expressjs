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
exports.CreateUserHandler = exports.CreateUserController = exports.CreateUserRequestDto = exports.CreateUser = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const role_1 = require("../../../enums/role");
const user_1 = require("../../../entities/user");
const userDto_1 = require("../../../dtos/userDto");
const mapping_1 = __importDefault(require("../../../mapping"));
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const validation_1 = require("building-blocks/utils/validation");
const conflictException_1 = __importDefault(require("building-blocks/types/exception/conflictException"));
const encryption_1 = require("building-blocks/utils/encryption");
const tsyringe_1 = require("tsyringe");
const identityContract_1 = require("building-blocks/contracts/identityContract");
class CreateUser {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateUser = CreateUser;
class CreateUserRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateUserRequestDto = CreateUserRequestDto;
const createUserValidations = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().custom(validation_1.password),
    name: joi_1.default.string().required(),
    passportNumber: joi_1.default.string().required(),
    role: joi_1.default.string().required().valid(role_1.Role.USER, role_1.Role.ADMIN)
});
let CreateUserController = class CreateUserController extends tsoa_1.Controller {
    createUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new CreateUser({
                email: request.email,
                password: request.password,
                name: request.name,
                role: request.role,
                passportNumber: request.passportNumber
            }));
            this.setStatus(http_status_1.default.CREATED);
            return result;
        });
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "createUser", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, tsoa_1.Route)('/user')
], CreateUserController);
let CreateUserHandler = class CreateUserHandler {
    constructor(publisher, userRepository) {
        this.publisher = publisher;
        this.userRepository = userRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield createUserValidations.validateAsync(request);
            const existUser = yield this.userRepository.findUserByEmail(request.email);
            if (existUser) {
                throw new conflictException_1.default('Email already taken');
            }
            const userEntity = yield this.userRepository.createUser(new user_1.User({
                email: request.email,
                name: request.name,
                password: yield (0, encryption_1.encryptPassword)(request.password),
                role: request.role,
                passportNumber: request.passportNumber,
                isEmailVerified: false
            }));
            yield this.publisher.publishMessage(new identityContract_1.UserCreated(userEntity));
            const result = mapping_1.default.map(userEntity, new userDto_1.UserDto());
            return result;
        });
    }
};
exports.CreateUserHandler = CreateUserHandler;
exports.CreateUserHandler = CreateUserHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateUserHandler);
//# sourceMappingURL=createUser.js.map