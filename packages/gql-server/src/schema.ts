/* eslint-disable @typescript-eslint/no-var-requires */
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const typeDefs = require('./schema.graphql').concat(
  require('./resolvers/mutations/mutations.graphql'),
  require('./resolvers/queries/queries.graphql'),
);

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
