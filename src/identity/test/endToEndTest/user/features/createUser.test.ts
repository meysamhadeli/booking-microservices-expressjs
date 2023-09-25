import 'reflect-metadata';
import {
  initialIntegrationTestFixture,
  IntegrationTestFixture
} from '../../../shared/initialIntegrationTestFixture';
import { CreateUser, CreateUserRequestDto } from '../../../../src/user/features/v1/createUser/createUser';
import { Role } from '../../../../src/user/enums/role';
import { UserCreated } from 'building-blocks/contracts/identityContract';
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
    const createUserRequestDto: CreateUserRequestDto = {
      email: 'test@test.com',
      password: 'Admin@1234',
      name: 'test',
      role: Role.USER,
      passportNumber: '123456789'
    };

    const createUserResponse = await request(fixture.app)
      .post('/user/v1/create')
      .send(createUserRequestDto)
      .expect(201);
  });
});
