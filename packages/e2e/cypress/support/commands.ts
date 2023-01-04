/// <reference types="cypress" />
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import { AuthModel, getSdk } from "../../gql-sdk/generated";
const client = new GraphQLClient("http://127.0.0.1:4003/graphql");

export const sdk = getSdk(client);
declare global {
  namespace Cypress {
    interface Chainable {
      getAuth: typeof getAuth;
      getAllChats: typeof getAllChats;
    }
  }
}
const getAuth = async (username: string, password: string) => {
  const { loginUser } = await sdk.LoginUser({ username, password });
  if (loginUser.__typename === "Error") throw new Error(loginUser.message);
  return loginUser;
};

const getAllChats = async (auth: AuthModel) => {
  const { getAllChats } = await sdk.GetChatList({ auth });
  if (getAllChats.__typename === "Error") throw new Error(getAllChats.message);
  return getAllChats;
};

Cypress.Commands.add("getAuth", getAuth);
Cypress.Commands.add("getAllChats", getAllChats);
