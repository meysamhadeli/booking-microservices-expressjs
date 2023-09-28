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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeed = void 0;
const tsyringe_1 = require("tsyringe");
const userRepository_1 = require("../repositories/userRepository");
const user_1 = require("../../user/entities/user");
const encryption_1 = require("building-blocks/utils/encryption");
const role_1 = require("../../user/enums/role");
const logger_1 = require("building-blocks/logging/logger");
class UserSeed {
    constructor() {
        this.logger = tsyringe_1.container.resolve(logger_1.Logger);
    }
    seedData() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = tsyringe_1.container.resolve(userRepository_1.UserRepository);
            if (((_a = (yield userRepository.getAllUsers())) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                yield userRepository.createUser(new user_1.User({
                    email: 'dev@dev.com',
                    name: 'developer',
                    password: yield (0, encryption_1.encryptPassword)('Admin@1234'),
                    isEmailVerified: false,
                    role: role_1.Role.ADMIN,
                    passportNumber: '12345678'
                }));
                this.logger.info('Seed users run successfully!');
            }
        });
    }
}
exports.UserSeed = UserSeed;
//# sourceMappingURL=userSeed.js.map