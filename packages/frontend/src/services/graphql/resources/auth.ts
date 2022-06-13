import { api } from "../api_helper";

const rootUrl = "";

const auth = {
  login: async (username: string, password: string) => {
    try {
      const res = await api(rootUrl, {
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

  refresh: async (user_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          refreshToken(username: "${user_id}", token: "${token}") {
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

  logout: async (user_id: string, token: string) => {
    try {
      console.log(`
        mutation {
          logoutUser(user_id: "${user_id}", token: "${token}") {
            Message
          }
        }`);

      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          logoutUser(user_id: "${user_id}", token: "${token}") {
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
