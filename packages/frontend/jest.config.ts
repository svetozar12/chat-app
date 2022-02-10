const path = require("path");

export default {
  clearMocks: true,
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
};
