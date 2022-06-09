import { ApolloClient, InMemoryCache } from "@apollo/client";
import { constants } from "../constants";
const client = new ApolloClient({
  uri: constants.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
