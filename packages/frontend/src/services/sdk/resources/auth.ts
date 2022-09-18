import { AuthModel, LoginUser, Message } from '@chat-app/gql-server';
import tryCatchWrapper from 'utils/tsWrapper';
import { client } from '../index';

const rootUrl = '';

const auth = {
  login: async (username: string, password: string) => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          loginUser(username: "${username}", password: "${password}") {
            user_id
            Access_token
            Refresh_token
          }
         }`,
        },
      });
      const {
        data: {
          data: { loginUser },
        },
      } = res;

      if (!loginUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return loginUser;
    } catch (error) {
      return error;
    }
  },

  refresh: async (auth: AuthModel): Promise<LoginUser> => {
    try {
      const { userId, AccessToken } = auth;
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          refreshToken(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            user_id
            Access_token
            Refresh_token
          }
        }`,
        },
      });

      const {
        data: {
          data: { refreshToken },
        },
      } = res;

      if (!refreshToken) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return refreshToken;
    } catch (error) {
      return error;
    }
  },

  logout: async (auth: AuthModel): Promise<Message> => {
    try {
      const { userId, AccessToken } = auth;

      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          logoutUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            Message
          }
        }`,
        },
      });

      const {
        data: {
          data: { logoutUser },
        },
      } = res;

      if (!logoutUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return logoutUser;
    } catch (error) {
      return error;
    }
  },
};

export default auth;
