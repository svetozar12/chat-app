import { GraphQLObjectType, GraphQLString } from "graphql";

const createUserSchema = new GraphQLObjectType({
  name: "createUser",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

export default createUserSchema;
