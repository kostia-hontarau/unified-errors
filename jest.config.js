module.exports = {
  verbose: true,
  collectCoverageFrom: ["src/**/*.{js}", "!**/node_modules/**"],
  testMatch: ["<rootDir>/src/**/?(*.)(spec|test).js"],
  testEnvironment: "node",
};
