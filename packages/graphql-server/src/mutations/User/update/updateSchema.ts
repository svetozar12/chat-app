import { GraphQLObjectType, GraphQLString } from "graphql";

const updateUserSchema = new GraphQLObjectType({
  name: "updateUser",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

export default updateUserSchema;
