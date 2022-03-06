export default {
  clearMocks: true,
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  snapshotSerializers: ["@emotion/jest/serializer" /* if needed other snapshotSerializers should go here */],
};
