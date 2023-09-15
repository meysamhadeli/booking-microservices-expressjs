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
exports.CreateUserHandler = exports.CreateUser = void 0;
const mediatr_js_1 = require("../../mediatr.js");
const user_validation_1 = __importDefault(require("../../validations/user.validation"));
const dataSource_1 = require("../../data/dataSource");
const user_1 = require("../entities/user");
const encryption_1 = require("../../utils/encryption");
const mapping_1 = __importDefault(require("../mapping"));
class CreateUser {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateUser = CreateUser;
class CreateUserHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_validation_1.default.createUser.validateAsync(request);
            // if (await getUserByEmail(createUserDto.email)) {
            //   throw new ConflictError('Email already taken');
            // }
            const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
            const user = {
                createdAt: new Date(),
                email: request.email,
                name: request.name,
                role: request.role,
                password: yield (0, encryption_1.encryptPassword)(request.password),
                isEmailVerified: false
            };
            const dto = mapping_1.default.mapper.map(mapping_1.default.userToUserDto, user);
            return yield userRepository.save(user);
        });
    }
}
exports.CreateUserHandler = CreateUserHandler;
const createUserHandler = new CreateUserHandler();
mediatr_js_1.mediatrJs.registerHandler(CreateUser, createUserHandler);
//# sourceMappingURL=createUser.js.map