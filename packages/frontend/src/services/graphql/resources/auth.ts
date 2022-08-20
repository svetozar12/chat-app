import { api } from '../apiHelper';

const rootUrl = '';

const auth = {
  login: async (username: string, password: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          loginUser(username: "${username}", password: "${password}") {
            userId
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

  refresh: async (userId: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          refreshToken(username: "${userId}", token: "${token}") {
            userId
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

  logout: async (userId: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          logoutUser(userId: "${userId}", token: "${token}") {
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
