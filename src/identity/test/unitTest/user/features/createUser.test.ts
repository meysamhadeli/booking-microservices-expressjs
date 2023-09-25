import { User } from '../../../../src/user/entities/user';
import {
  CreateUser,
  CreateUserHandler
} from '../../../../src/user/features/v1/createUser/createUser';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { Role } from '../../../../src/user/enums/role';
import { UserCreated } from 'building-blocks/contracts/identityContract';

describe('unit test for create user', () => {
  let createUserHandler: CreateUserHandler;

  const user: User = {
    id: 1,
    name: 'test',
    role: Role.USER,
    password: 'Admin@1234',
    email: 'test@test.com',
    passportNumber: '123456789',
    isEmailVerified: false,
    createdAt: new Date(),
    tokens: []
  };

  const mockUserRepository = {
    createUser: jest.fn().mockReturnValue(Promise.resolve(user)),
    updateUser: jest.fn(),
    findUsers: jest.fn(),
    findUserByName: jest.fn(),
    findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    findUserById: jest.fn(),
    getAllUsers: jest.fn(),
    removeUser: jest.fn()
  };

  const mockPublisher: IPublisher = {
    publishMessage: jest.fn(),
    isPublished: jest.fn()
  };

  beforeEach(() => {
    createUserHandler = new CreateUserHandler(mockPublisher, mockUserRepository);
  });

  it('should create a user and retrieve a valid data', async () => {
    const createUserRequest: CreateUser = {
      name: 'test',
      role: Role.USER,
      password: 'Admin@1234',
      email: 'test@test.com',
      passportNumber: '123456789'
    };

    const email = 'test@test.com';

    const userCreated = new UserCreated(user.id, user.name, user.passportNumber);

    // Mock userRepository's behavior when finding a user by email
    await mockUserRepository.findUserByEmail(email);

    // Mock userRepository's behavior when creating a user
    await mockUserRepository.createUser(user);

    // Mock publisher's behavior when publishing a user created
    await mockPublisher.publishMessage(userCreated);

    const result: UserDto = await createUserHandler.handle(createUserRequest);

    // Assertions based on your expected behavior
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
    expect(mockPublisher.publishMessage).toHaveBeenCalledWith(userCreated);
    expect(result).not.toBeNull();
  });
});
