import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  testTimeout: 0,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
};

export default config;
