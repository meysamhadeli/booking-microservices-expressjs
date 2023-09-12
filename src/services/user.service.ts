import {encryptPassword} from '../utils/encryption';
import ApplicationError from "../types/applicationError";
import NotFoundError from "../types/notFoundError";
import {dataSource} from "../data/dataSource";
import {User} from "../entities/user";
import {Role} from "../enums/role";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  email: string,
  password: string,
  name?: string,
  role: Role = Role.USER
): Promise<User> => {
  // if (await getUserByEmail(email)) {
  //   throw new ApplicationError('Email already taken');
  // }
  const userRepository = dataSource.getRepository(User);

  const user = {
    createdAt: new Date(),
    email: email,
    name: name,
    role: role,
    password: await encryptPassword(password),
    isEmailVerified: false
  };

  return await userRepository.save(user);
};

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
const getUserById = async (
  id: number
): Promise<User | null> => {

  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id
  });

  return user
};

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

export default {
  createUser,
  // queryUsers,
  getUserById,
  // getUserByEmail,
  // updateUserById,
  // deleteUserById
};
