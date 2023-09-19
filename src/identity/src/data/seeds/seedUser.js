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
exports.seedUser = void 0;
const userRepository_1 = require("../repositories/userRepository");
const user_1 = require("../../user/entities/user");
const role_1 = require("../../user/enums/role");
const encryption_1 = require("building-blocks/utils/encryption");
const seedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRepository = new userRepository_1.UserRepository();
    if (((_a = (yield userRepository.getAllUsers())) === null || _a === void 0 ? void 0 : _a.length) == 0)
        yield userRepository.createUser(new user_1.User('dev@dev.com', 'developer', yield (0, encryption_1.encryptPassword)('Admin@1234'), false, role_1.Role.ADMIN, '12345678'));
});
exports.seedUser = seedUser;
//# sourceMappingURL=seedUser.js.map