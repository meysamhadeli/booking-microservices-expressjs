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
const encryption_1 = require("../utils/encryption");
const notFoundError_1 = __importDefault(require("../types/notFoundError"));
const dataSource_1 = require("../data/dataSource");
const user_1 = require("../entities/user");
const conflictError_1 = __importDefault(require("../types/conflictError"));
const typeorm_1 = require("typeorm");
const response_1 = require("../types/response");
/**
 * Create a user
 * @param {CreateUserDto} createUserDto
 * @returns {Promise<User>}
 */
const createUser = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield getUserByEmail(createUserDto.email)) {
        throw new conflictError_1.default('Email already taken');
    }
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    const user = {
        createdAt: new Date(),
        email: createUserDto.email,
        name: createUserDto.name,
        role: createUserDto.role,
        password: yield (0, encryption_1.encryptPassword)(createUserDto.password),
        isEmailVerified: false
    };
    return yield userRepository.save(user);
});
/**
 * Query for users
 * @param {SearchDto} searchDto
 * @returns {Promise<PagedResult<User[]>>}
 */
const queryUsers = (searchDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    const [result, total] = yield userRepository.findAndCount({
        where: { name: (0, typeorm_1.Like)('%' + (searchDto === null || searchDto === void 0 ? void 0 : searchDto.searchTerm) + '%') },
        order: { id: (_a = searchDto === null || searchDto === void 0 ? void 0 : searchDto.order) !== null && _a !== void 0 ? _a : "ASC" },
        take: searchDto.pageSize,
        skip: searchDto.page
    });
    return new response_1.PagedResultResponse(result, total);
});
/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User | null>}
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    return yield userRepository.findOneBy({
        id: id
    });
});
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User | null>}
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    return yield userRepository.findOneBy({
        email: email
    });
});
/**
 * Update user by id
 * @param {number} userId
 * @param {UpdateUserDto} updateUserDto
 * @returns {Promise<User>}
 */
const updateUserById = (userId, updateUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserById(userId);
    if (!user) {
        throw new notFoundError_1.default('User not found');
    }
    const updatedUser = {
        email: updateUserDto.email,
        name: updateUserDto.name,
        role: updateUserDto.role,
        password: yield (0, encryption_1.encryptPassword)(updateUserDto.password),
        isEmailVerified: false,
        updatedAt: new Date()
    };
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    return yield userRepository.save(updatedUser);
});
/**
 * Delete user by id
 * @param {number} userId
 * @returns {Promise<User>}
 */
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserById(userId);
    if (!user) {
        throw new notFoundError_1.default('User not found');
    }
    const userRepository = yield dataSource_1.dataSource.getRepository(user_1.User);
    yield userRepository.remove(user);
    return user;
});
exports.default = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById
};
//# sourceMappingURL=user.service.js.map