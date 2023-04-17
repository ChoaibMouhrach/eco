import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  setupFilesAfterEnv: ["./setup.ts"],
  transform: {
    "^.+\\.(t|j)s?$": "@swc/jest",
  },
  testMatch: ["**/*.test.ts"],
  testTimeout: 0,
};

export default config;
