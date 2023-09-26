import 'reflect-metadata';
import {
  initialIntegrationTestFixture,
  IntegrationTestFixture
} from '../../../shared/fixtures/initialIntegrationTestFixture';
import {
  FakeCreateUserRequestDto
} from '../../../shared/fakes/user/fakeCreateUserRequestDto';
const request = require('supertest');

describe('end-to-end test for create user', () => {
  let fixture: IntegrationTestFixture;

  beforeAll(async () => {
    fixture = await initialIntegrationTestFixture();
  });

  afterAll(async () => {
    await fixture.postgresContainer.stop();
    await fixture.rabbitmqContainer.stop();
  });

  it('should create user and retrieve 201 status code', async () => {

    const createUserResponse = await request(fixture.app)
      .post('/user/v1/create')
      .send(FakeCreateUserRequestDto.generate())
      .expect(201);
  });
});
