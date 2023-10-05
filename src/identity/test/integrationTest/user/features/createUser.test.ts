import 'reflect-metadata';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { UserDto } from '../../../../src/user/dtos/userDto';
import { UserCreated } from 'building-blocks/contracts/identityContract';
import { FakeCreateUser } from '../../../shared/fakes/user/fakeCreateUser';
import { Fixture, IntegrationTestFixture } from '../../../shared/fixtures/integrationTestFixture';

describe('integration test for create user', () => {
  const integrationTestFixture = new IntegrationTestFixture();
  let fixture: Fixture;

  beforeAll(async () => {
    fixture = await integrationTestFixture.initilizeFixture();
  });

  afterAll(async () => {
    await integrationTestFixture.cleanUp();
  });

  it('should create user and retrieve a user from the database', async () => {
    const result = await mediatrJs.send<UserDto>(FakeCreateUser.generate());

    const isPublished = await fixture.publisher.isPublished(new UserCreated());
    expect(isPublished).toBe(true);

    const user = fixture.userRepository.findUserById(result.id);
    expect(user).not.toBeNull();
  });
});
