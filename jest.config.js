/** @type {import('@jest/types').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/__tests__/environment.ts',
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,ts}'],
  testTimeout: 15_000,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '__tests__/tsconfig.json' }]
  },
};
