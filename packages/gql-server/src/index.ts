import "./config/preinit";
import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema";
import logger from "./utils/logger";
// types
export * from "./generated/graphql";

async function main() {
  const server = createServer({
    schema,
    port: 4003,
    async context({ request, query }) {
      logger("warn", "GRAPHQL-SERVER-REQUEST-LOG");
      logger("info", request.url, [query]);
    },
  });
  await server.start();
}

main();
