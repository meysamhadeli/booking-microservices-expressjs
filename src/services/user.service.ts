import {encryptPassword} from '../utils/encryption';
import NotFoundError from "../types/notFoundError";
import {dataSource} from "../data/dataSource";
import {User} from "../entities/user";
import ConflictError from "../types/conflictError";
import {CreateUserDto} from "../dtos/createUserDto";
import {UpdateUserDto} from "../dtos/updateUserDto";
import {SearchDto} from "../dtos/searchDto";
import {Like} from "typeorm";
import {PagedResultResponse} from "../types/response";
import userValidation from '../validations/user.validation';


/**
 * Create a user
 * @param {CreateUserDto} createUserDto
 * @returns {Promise<User>}
 */
const createUser = async (createUserDto: CreateUserDto
): Promise<User> => {

  await userValidation.createUser.validateAsync(createUserDto);

  if (await getUserByEmail(createUserDto.email)) {
    throw new ConflictError('Email already taken');
  }
  const userRepository = dataSource.getRepository(User);

  const user = {
    createdAt: new Date(),
    email: createUserDto.email,
    name: createUserDto.name,
    role: createUserDto.role,
    password: await encryptPassword(createUserDto.password),
    isEmailVerified: false
  };

  return await userRepository.save(user);
};

/**
 * Query for users
 * @param {SearchDto} searchDto
 * @returns {Promise<PagedResult<User[]>>}
 */
const queryUsers = async (searchDto: SearchDto
): Promise<PagedResultResponse<User[]>> => {

  await userValidation.queryUsers.validateAsync(searchDto);

  const userRepository = dataSource.getRepository(User);

  const [result, total] =  await userRepository.findAndCount(
    {
      where: { name: Like('%' + searchDto?.searchTerm + '%') },
      order: { id: searchDto?.order ?? "ASC" },
      take: searchDto.pageSize,
      skip: searchDto.page
    }
  );

  return new PagedResultResponse<User[]>(result, total);
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User | null>}
 */
const getUserById = async (
  id: number
): Promise<User | null> => {

  await userValidation.getUserById.params.validateAsync(id);

  const userRepository = dataSource.getRepository(User);

  return await userRepository.findOneBy({
    id: id
  });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User | null>}
 */
const getUserByEmail = async (
  email: string,
): Promise<User | null> => {

  const userRepository = dataSource.getRepository(User);

  return await userRepository.findOneBy({
    email: email
  });
};

/**
 * Update user by id
 * @param {number} userId
 * @param {UpdateUserDto} updateUserDto
 * @returns {Promise<User>}
 */
const updateUserById = async (
  userId: number,
  updateUserDto: UpdateUserDto,
): Promise<User | null> => {

  await userValidation.updateUserById.validateAsync(updateUserDto);

  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const updatedUser = {
    email: updateUserDto.email,
    name: updateUserDto.name,
    role: updateUserDto.role,
    password: await encryptPassword(updateUserDto.password),
    isEmailVerified: false,
    updatedAt: new Date()
  };

  const userRepository = dataSource.getRepository(User);

  return await userRepository.save(updatedUser);
};

/**
 * Delete user by id
 * @param {number} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: number): Promise<User> => {

  await userValidation.deleteUserById.params.validateAsync(userId);

  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const userRepository = await dataSource.getRepository(User);

  await userRepository.remove(user);

  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
