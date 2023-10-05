import 'reflect-metadata';
import { FakeCreateUserRequestDto } from '../../../shared/fakes/user/fakeCreateUserRequestDto';
import { EndToEndTestFixture } from '../../../shared/fixtures/endToEndFixture';
import { Fixture } from '../../../shared/fixtures/integrationTestFixture';
const request = require('supertest');

describe('end-to-end test for create user', () => {
  const endToEndFixture = new EndToEndTestFixture();
  let fixture: Fixture;

  beforeAll(async () => {
    fixture = await endToEndFixture.initilizeFixture();
  });

  afterAll(async () => {
    await endToEndFixture.cleanUp();
  });

  it('should create user and retrieve 201 status code', async () => {
    const createUserResponse = await request(fixture.app)
      .post('/user/v1/create')
      .send(FakeCreateUserRequestDto.generate())
      .expect(201);
  });
});
