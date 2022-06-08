import { GraphQLObjectType, GraphQLString } from "graphql";

const deleteUserSchema = new GraphQLObjectType({
  name: "deleteUser",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

export default deleteUserSchema;
