import type { Config } from 'jest';

export default {
  displayName: 'ts-only',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  testMatch: ['**/*.test.ts'],
} satisfies Config;
