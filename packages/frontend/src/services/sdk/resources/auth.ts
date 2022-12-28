import {
  AuthModel,
  LoginUser,
  Message,
  MutationLoginUserArgs,
  MutationLogoutUserArgs,
  MutationRefreshTokenArgs,
} from 'services/generated/graphql';
import makeRequest from 'utils/makeRequest';

const path = '';

const auth = {
  login: async (args: MutationLoginUserArgs): Promise<LoginUser> => {
    const { username, password } = args;
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

  refresh: async (args: MutationRefreshTokenArgs): Promise<LoginUser> => {
    const { user_id, RefreshToken } = args;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          refreshToken(auth:{userId: "${user_id}", RefreshToken: "${RefreshToken}"}) {
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

  logout: async (args: MutationLogoutUserArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
    } = args;
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
