import 'reflect-metadata';
import {
  initialIntegrationTestFixture,
  IntegrationTestFixture
} from '../../../shared/fixtures/initialIntegrationTestFixture';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { UserCreated } from 'building-blocks/contracts/identityContract';
import { FakeCreateUser } from '../../../shared/fakes/user/fakeCreateUser';

describe('integration test for create user', () => {
  let fixture: IntegrationTestFixture;

  beforeAll(async () => {
    fixture = await initialIntegrationTestFixture();
  });

  afterAll(async () => {
    await fixture.postgresContainer.stop();
    await fixture.rabbitmqContainer.stop();
  });

  it('should create user and retrieve a user from the database', async () => {
    const result = await mediatrJs.send<UserDto>(FakeCreateUser.generate());

    const isPublished = await fixture.publisher.isPublished(new UserCreated());
    expect(isPublished).toBe(true);

    const isConsumed = await fixture.consumer.isConsumed(new UserCreated());
    expect(isConsumed).toBe(true);

    const user = fixture.userRepository.findUserById(result.id);
    expect(user).not.toBeNull();
  });
});
