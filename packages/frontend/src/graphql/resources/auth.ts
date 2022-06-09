import { api } from "../api_helper";

const rootUrl = "";

const auth = {
  login: async (username: string, password: string) => {
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
  },

  refresh: async (user_id: string, token: string) => {
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
  },

  logout: async (user_id: string, token: string) => {
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
  },
};

export default auth;
