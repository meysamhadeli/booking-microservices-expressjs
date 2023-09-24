import 'reflect-metadata';
import {
  initialIntegrationTestFixture,
  IntegrationTestFixture
} from '../../../shared/initialIntegrationTestFixture';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { CreateUser } from '../../../../src/user/features/v1/createUser';
import { Role } from '../../../../src/user/enums/role';
import { UserCreated } from 'building-blocks/contracts/identityContract';

describe('Integration Test', () => {
  let fixture: IntegrationTestFixture;

  beforeAll(async () => {
    fixture = await initialIntegrationTestFixture();
  });

  afterAll(async () => {
    await fixture.postgresContainer.stop();
    await fixture.rabbitmqContainer.stop();
  });

  it('should create user and retrieve a user from the database', async () => {
    const result = await mediatrJs.send<UserDto>(
      new CreateUser({
        email: 'test@test.com',
        password: 'Admin@1234',
        name: 'test',
        role: Role.USER,
        passportNumber: '123456789'
      })
    );

    const isPublished = await fixture.publisher.isPublished(new UserCreated());
    expect(isPublished).toBe(true);

    const isConsumed = await fixture.consumer.isConsumed(new UserCreated());
    expect(isConsumed).toBe(true);

    const user = fixture.userRepository.findUserById(result.id);
    expect(user).not.toBeNull();
  });
});
