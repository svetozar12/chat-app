import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@chat-app/graphql-server';
import axios from 'axios';

export const client = new GraphQLClient('http://localhost:4001/graphql', {
  fetch: axios,
});
const sdk = getSdk(client);
// sdk.
// sdk.getUser()

export default sdk;
