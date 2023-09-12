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
const encryption_1 = require("../utils/encryption");
const dataSource_1 = require("../data/dataSource");
const user_1 = require("../entities/user");
const role_1 = require("../enums/role");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = (email, password, name, role = role_1.Role.USER) => __awaiter(void 0, void 0, void 0, function* () {
    // if (await getUserByEmail(email)) {
    //   throw new ApplicationError('Email already taken');
    // }
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    const user = {
        createdAt: new Date(),
        email: email,
        name: name,
        role: role,
        password: yield (0, encryption_1.encryptPassword)(password),
        isEmailVerified: false
    };
    return yield userRepository.save(user);
});
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryUsers = async <Key extends keyof User>(
//   filter: object,
//   options: {
//     limit?: number;
//     page?: number;
//     sortBy?: string;
//     sortType?: 'asc' | 'desc';
//   },
//   keys: Key[] = [
//     'id',
//     'email',
//     'name',
//     'password',
//     'role',
//     'isEmailVerified',
//     'createdAt',
//     'updatedAt'
//   ] as Key[]
// ): Promise<Pick<User, Key>[]> => {
//   const page = options.page ?? 1;
//   const limit = options.limit ?? 10;
//   const sortBy = options.sortBy;
//   const sortType = options.sortType ?? 'desc';
//   const users = await prisma.user.findMany({
//     where: filter,
//     select: keys.reduce((obj, k) => ({...obj, [k]: true}), {}),
//     skip: page * limit,
//     take: limit,
//     orderBy: sortBy ? {[sortBy]: sortType} : undefined
//   });
//   return users as Pick<User, Key>[];
// };
//
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User | null>}
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
    const user = yield userRepository.findOneBy({
        id: id
    });
    return user;
});
// /**
//  * Get user by email
//  * @param {string} email
//  * @param {Array<Key>} keys
//  * @returns {Promise<Pick<User, Key> | null>}
//  */
// const getUserByEmail = async <Key extends keyof User>(
//   email: string,
//   keys: Key[] = [
//     'id',
//     'email',
//     'name',
//     'password',
//     'role',
//     'isEmailVerified',
//     'createdAt',
//     'updatedAt'
//   ] as Key[]
// ): Promise<Pick<User, Key> | null> => {
//   return prisma.user.findUnique({
//     where: {email},
//     select: keys.reduce((obj, k) => ({...obj, [k]: true}), {})
//   }) as Promise<Pick<User, Key> | null>;
// };
//
// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateUserById = async <Key extends keyof User>(
//   userId: number,
//   updateBody: Prisma.UserUpdateInput,
//   keys: Key[] = ['id', 'email', 'name', 'role'] as Key[]
// ): Promise<Pick<User, Key> | null> => {
//   const user = await getUserById(userId, ['id', 'email', 'name']);
//   if (!user) {
//     throw new NotFoundError('User not found');
//   }
//   if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
//     throw new ApplicationError('Email already taken');
//   }
//   const updatedUser = await prisma.user.update({
//     where: {id: user.id},
//     data: updateBody,
//     select: keys.reduce((obj, k) => ({...obj, [k]: true}), {})
//   });
//   return updatedUser as Pick<User, Key> | null;
// };
//
// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId: number): Promise<User> => {
//   const user = await getUserById(userId);
//   if (!user) {
//     throw new ApplicationError('User not found');
//   }
//   await prisma.user.delete({where: {id: user.id}});
//   return user;
// };
exports.default = {
    createUser,
    // queryUsers,
    getUserById,
    // getUserByEmail,
    // updateUserById,
    // deleteUserById
};
//# sourceMappingURL=user.service.js.map