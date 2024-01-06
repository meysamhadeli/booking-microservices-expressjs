import 'reflect-metadata';
import { UserCreated } from 'building-blocks/contracts/identity.contract';
import {Fixture, IntegrationTestFixture} from "../../../shared/fixtures/integration-test.fixture";
import {UserDto} from "../../../../src/user/dtos/user.dto";
import {FakeCreateUser} from "../../../shared/fakes/user/fake-create-user";
import {mediatrJs} from "building-blocks/mediatr-js/mediatr-js";

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
