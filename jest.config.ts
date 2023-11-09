import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  testEnvironment: "node",
  coverageReporters: ["html", "text", "json-summary"],
  roots: ["src"],
  testPathIgnorePatterns: ["/node_modules/", "__utils__"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: './tsconfig.base.json'
      },
    ],
  },
};

export default config;
