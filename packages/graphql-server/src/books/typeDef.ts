import { gql } from "apollo-server";

const typeDefs = `
  type Book {
    title: String
    author: String
  }

  type Query {
    books(title: String!): Book
  }
`;

export { typeDefs as bookTypes };
