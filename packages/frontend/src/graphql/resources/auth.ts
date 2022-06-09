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
      return res.data.data.loginUser;
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
      return res.data.data.loginUser;
    } catch (error) {
      return error;
    }
  },

  logout: async (user_id: string, token: string) => {
    try {
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
      return res.data;
    } catch (error) {
      return error;
    }
  },
};

export default auth;
