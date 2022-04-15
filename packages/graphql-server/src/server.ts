const { ApolloServer, gql } = require("apollo-server");
import { bookTypes } from "./books/typeDef";
// resolvers
import BookResolver from "./books/resolvers";

const typeDefs = gql`
  ${bookTypes}
`;

console.log(typeDefs);

const resolvers = {
  ...BookResolver,
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
