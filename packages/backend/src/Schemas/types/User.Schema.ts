import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLEnumType, GraphQLInputObjectType } from "graphql";
// Construct a schema, using GraphQL schema language

const genderSchema = new GraphQLEnumType({
  name: "gender",
  values: {
    Male: { value: "Male" },
    Female: { value: "Female" },
    Others: { value: "Others" },
  },
});

const UserSchema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: {
      type: genderSchema,
    },
    userAvatar: { type: GraphQLString },
  }),
});

const FileSchema = new GraphQLInputObjectType({
  name: "File",
  fields: () => ({
    fieldname: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The fieldname used to POST this file.",
    },
    originalname: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The original file name.",
    },
  }),
});
export { UserSchema, genderSchema };
