import { startupApp } from '../../src/app';

beforeAll(async () => {
  await initialIntegrationTestFixture();
  console.log('before all test');
});

// After all tests
afterAll(async () => {
  console.log('after all test');
});

export const initialIntegrationTestFixture = async (): Promise<void> => {
  await startupApp();
};
