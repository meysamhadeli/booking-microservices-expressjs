import 'reflect-metadata';
import {
  initialIntegrationTestFixture,
  IntegrationTestFixture
} from '../../../shared/initialIntegrationTestFixture';

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
    const usersEntity = await fixture.userRepository.findUserById(1);

    console.log('hiii');
  });
});
