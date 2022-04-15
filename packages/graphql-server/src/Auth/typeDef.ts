import { gql } from "apollo-server";

const typeDefs = `
  type AuthUser {
    username: String,
    password: String,
    iat: Int,
    exp: Int
  }

  type Query {
    authUser: AuthUser
  }
`;

export { typeDefs as authTypes };
