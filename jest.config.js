const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./__tests__/testSetup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "./__tests__/testSetup.ts"],
};
module.exports = createJestConfig(customJestConfig);