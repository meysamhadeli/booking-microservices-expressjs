import { CreateUserHandler } from '../../../../src/user/features/v1/createUser/createUser';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { UserCreated } from 'building-blocks/contracts/identityContract';
import { faker } from '@faker-js/faker';
import { FakeUser } from '../../../shared/fakes/user/fakeUser';
import { User } from '../../../../src/user/entities/user';
import { FakeCreateUser } from '../../../shared/fakes/user/fakeCreateUser';
import * as TypeMoq from 'typemoq';
import { IUserRepository } from '../../../../src/data/repositories/userRepository';

describe('unit test for create user', () => {
  let createUserHandler: CreateUserHandler;

  const fakeUser: User = FakeUser.generate();

  const mockUserRepository: TypeMoq.IMock<IUserRepository> = TypeMoq.Mock.ofType<IUserRepository>();
  const mockPublisher: TypeMoq.IMock<IPublisher> = TypeMoq.Mock.ofType<IPublisher>();

  beforeEach(() => {
    createUserHandler = new CreateUserHandler(mockPublisher.object, mockUserRepository.object);
  });

  it('should create a user and retrieve a valid data', async () => {
    const email = faker.internet.email();

    mockUserRepository
      .setup((x) => x.findUserByEmail(TypeMoq.It.isAnyString()))
      .returns(() => null);

    const userCreated = new UserCreated({
      name: fakeUser.name,
      passportNumber: fakeUser.passportNumber,
      id: fakeUser.id
    });

    // Mock userRepository's behavior when creating a user
    mockUserRepository
      .setup((x) => x.createUser(TypeMoq.It.isAnyObject(User)))
      .returns(() => Promise.resolve(fakeUser));

    // Mock publisher's behavior when publishing a user created
    mockPublisher.setup((x) => x.publishMessage(userCreated)).returns(() => Promise.resolve());

    const result: UserDto = await createUserHandler.handle(FakeCreateUser.generate(fakeUser));

    // Verify that the publishMessage method was called exactly once
    mockUserRepository.verify(
      (x) => x.findUserByEmail(TypeMoq.It.isAnyString()),
      TypeMoq.Times.once()
    );
    mockPublisher.verify((x) => x.publishMessage(userCreated), TypeMoq.Times.once());
    mockUserRepository.verify(
      (x) => x.createUser(TypeMoq.It.isAnyObject(User)),
      TypeMoq.Times.once()
    );
    expect(result).not.toBeNull();
  });
});
