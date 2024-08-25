/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/jtest.setup.ts'], // Adjust the path if necessary
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Ensure this points to your tsconfig.json
    },
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"]
};
