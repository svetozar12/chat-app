import { buildSchema } from 'graphql';
// @ts-ignore
import typeDefs from './schema.graphql';
// @ts-ignore
import gqlLoader from './utils/gqlLoader';

// we must convert the file Buffer to a UTF-8 string
console.log();

const typeDefs = gqlLoader('../schema.graphql').concat(
  gqlLoader('../mutations/mutations.graphql'),
  gqlLoader('../queries/getUser.graphql'),
);

const Schema = buildSchema(typeDefs);

export default Schema;
