/* eslint-disable @typescript-eslint/no-var-requires */
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import indexSchema from './schema.gql';
import querySchema from './resolvers/queries/queries.gql';
import mutationsSchema from './resolvers/mutations/mutations.gql';

const typeDefs = indexSchema.concat(querySchema, mutationsSchema);

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
