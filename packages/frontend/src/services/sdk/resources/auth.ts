import { AuthModel, LoginUser, Message } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';

const path = '';

const auth = {
  login: async (username: string, password: string): Promise<LoginUser> => {
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          loginUser(username: "${username}", password: "${password}") {
            userId
            AccessToken
            RefreshToken
          }
         }`,
        path,
      },
      'loginUser',
    );
  },

  refresh: async (userId: string, RefreshToken: string): Promise<LoginUser> => {
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          refreshToken(auth:{userId: "${userId}", RefreshToken: "${RefreshToken}"}) {
            userId
            AccessToken
            RefreshToken
          }
        }`,
        path,
      },
      'refreshToken',
    );
  },

  logout: async (auth: AuthModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          logoutUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            Message
          }
        }`,
        path,
      },
      'logoutUser',
    );
  },
};

export default auth;
