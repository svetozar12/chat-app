/* eslint-disable @typescript-eslint/no-var-requires */
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
// gql schemas
import querySchema from './resolvers/queries/queries.gql';
import mutationsSchema from './resolvers/mutations/mutations.gql';
import { unionSchema } from './types/union.gql';
import { enumSchema } from './types/enum.gql';
import { inputSchema } from './types/input.gql';
import { typeSchema } from './types/type.gql';

// combining all schemas into one
const typeDefs = typeSchema + unionSchema + enumSchema + inputSchema + querySchema + mutationsSchema;

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
