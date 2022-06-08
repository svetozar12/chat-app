import { api } from "..";

interface IAuthLogin {
  username: string;
  password: string;
}

const rootUrl = "/auth";

const auth = {
  login: async (userCredentials: IAuthLogin) => {
    return await api.post(`${rootUrl}/login`, userCredentials);
  },
  refresh: async (id: string, refresh_token: string) => {
    return await api.post(`${rootUrl}/refresh/${id}`, undefined, { headers: { Authorization: `Bearer ${refresh_token}` } });
  },
  logout: async (id: string, token: string) => {
    console.log(`${rootUrl}/logout/${id}`);
    return await api.post(`${rootUrl}/logout/${id}`, undefined, { headers: { Authorization: `Bearer ${token}` } });
  },
};

export default auth;
