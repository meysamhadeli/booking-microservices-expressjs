module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/shared/initialIntegrationTestFixture.js'] // Specify your setup file here
};
