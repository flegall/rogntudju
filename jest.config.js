// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  moduleNameMapper: {
    // Allows direct access to monorepo packages when running tests
    // Otherwise it would require rebuilding packages before running tests
    // We don't want to have that.
    "^@rogntudju/(.*)$": "<rootDir>/packages/$1/src"
  }
};
