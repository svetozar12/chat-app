var fs = require("fs");

require.extensions[".graphql"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

require.extensions[".gql"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

export {};
