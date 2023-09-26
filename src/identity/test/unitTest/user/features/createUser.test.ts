import { CreateUserHandler } from '../../../../src/user/features/v1/createUser/createUser';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { UserCreated } from 'building-blocks/contracts/identityContract';
import { fakeCreateUser } from '../../../shared/fakes/user/fakeCreateUser';
import { fakeUser } from '../../../shared/fakes/user/fakeUser';
import { faker } from '@faker-js/faker';

describe('unit test for create user', () => {
  let createUserHandler: CreateUserHandler;

  //todo: use a better approach for remove unnecessary mock here
  const mockUserRepository = {
    createUser: jest.fn().mockReturnValue(Promise.resolve(fakeUser)),
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
    const email = faker.internet.email();

    const userCreated = new UserCreated(fakeUser.id, fakeUser.name, fakeUser.passportNumber);

    // Mock userRepository's behavior when finding a user by email
    await mockUserRepository.findUserByEmail(email);

    // Mock userRepository's behavior when creating a user
    await mockUserRepository.createUser(fakeUser);

    // Mock publisher's behavior when publishing a user created
    await mockPublisher.publishMessage(userCreated);

    const result: UserDto = await createUserHandler.handle(fakeCreateUser);

    // Assertions based on your expected behavior
    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(fakeUser);
    expect(mockPublisher.publishMessage).toHaveBeenCalledWith(userCreated);
    expect(result).not.toBeNull();
  });
});
