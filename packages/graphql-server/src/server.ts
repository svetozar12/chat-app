const { ApolloServer, gql } = require("apollo-server");
import * as dotenv from "dotenv";
dotenv.config();

import { bookTypes } from "./books/typeDef";
import { authTypes } from "./Auth/typeDef";
// resolvers
import AuthResolver from "./Auth/resolvers";
import BookResolver from "./books/resolvers";

const typeDefs = gql`
  ${bookTypes}
  ${authTypes}
`;

const resolvers = {
  ...BookResolver,
  ...AuthResolver,
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
