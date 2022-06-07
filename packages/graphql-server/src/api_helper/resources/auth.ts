import { api } from "..";

interface IAuthLogin {
  username: string;
  password: string;
}

const rootUrl = "/auth";

const auth = {
  login: async (userCredentials: IAuthLogin) => {
    return await api.get(`${rootUrl}/login`, { data: userCredentials });
  },
  refresh: async (id: string, refresh_token: string) => {
    return await api.get(`${rootUrl}/refresh/${id}`, { headers: { Authorization: `Bearer ${refresh_token}` } });
  },
  logout: async (id: string, refresh_token: string) => {
    return await api.get(`${rootUrl}/logout/${id}`, { headers: { Authorization: `Bearer ${refresh_token}` } });
  },
};

export default auth;
