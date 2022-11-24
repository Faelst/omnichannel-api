import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest/utils";

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["**/src/**/*.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  preset: "ts-jest",
};
