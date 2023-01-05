/// <reference types="cypress" />
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import { AuthModel, getSdk, LoginUser } from "../../gql-sdk/generated";
const client = new GraphQLClient("http://127.0.0.1:4003/graphql");

export const sdk = getSdk(client);
declare global {
  namespace Cypress {
    interface Chainable {
      getAuth: typeof getAuth;
      getAllChats: typeof getAllChats;
      deleteUser: typeof deleteUser;
    }
  }
}

let auth: AuthModel = { userId: "", AccessToken: "" };

const getAuth = async (username: string, password: string) => {
  const { loginUser } = await sdk.LoginUser({ username, password });
  if (loginUser.__typename === "Error") throw new Error(loginUser.message);
  const { AccessToken, userId } = loginUser;
  auth = { userId, AccessToken };
  return loginUser;
};
// cy.setCookie("ACCESS_TOKEN", AccessToken);
// cy.setCookie("REFRESH_TOKEN", RefreshToken);
// cy.setCookie("USER_ID", userId);

const getAllChats = async () => {
  const { getAllChats } = await sdk.GetChatList({ auth });
  if (getAllChats.__typename === "Error") throw new Error(getAllChats.message);

  return getAllChats;
};

const deleteUser = async () => {
  return sdk.DeleteUser({ auth });
};

Cypress.Commands.add("getAuth", getAuth);
Cypress.Commands.add("getAllChats", getAllChats);
Cypress.Commands.add("deleteUser", deleteUser);
