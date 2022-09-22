import { AuthModel, LoginUser, Message } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';
import { client } from '../index';

const path = '';

const auth = {
  login: async (username: string, password: string): Promise<LoginUser> => {
    return makeRequest({
      gqlQuery: `
        mutation {
          loginUser(username: "${username}", password: "${password}") {
            user_id
            Access_token
            Refresh_token
          }
         }`,
      path,
    });
  },

  refresh: async (userId: string, RefreshToken: string): Promise<LoginUser> => {
    return makeRequest({
      gqlQuery: `
        mutation {
          refreshToken(auth:{userId: "${userId}", RefreshToken: "${RefreshToken}"}) {
            user_id
            Access_token
            Refresh_token
          }
        }`,
      path,
    });
  },

  logout: async (auth: AuthModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        mutation {
          logoutUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            Message
          }
        }`,
      path,
    });
  },
};

export default auth;
