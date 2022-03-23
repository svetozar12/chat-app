import { ApolloClient, InMemoryCache } from "@apollo/client";
import { requestUrl } from "../utils/hostUrl_requestUrl";
const client = new ApolloClient({
  uri: `${requestUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
