import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    "^.+\\.(t|j)s?$": "@swc/jest",
  },
  testMatch: [
    '**/*.test.ts'
  ],
};

export default config;
