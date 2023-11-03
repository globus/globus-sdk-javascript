import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["html", "text", "json-summary"],
  roots: ["src"],
  testPathIgnorePatterns: ["/node_modules/", "__utils__"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
