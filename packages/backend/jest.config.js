module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  roots: ["./__test__", "./src"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
  testMatch: ["**/__test__/**/*.test.(ts|js)", "**/src/**/*.test.(ts|js)"],
  setupFilesAfterEnv: ["./__test__/setupTests.ts"],
  testEnvironment: "node",
};
