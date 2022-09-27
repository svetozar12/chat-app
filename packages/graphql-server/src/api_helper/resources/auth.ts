import { api } from "..";
import AxiosErrorHandler from "../../utils/AxiosErrorHandler";

interface IAuthLogin {
  username: string;
  password: string;
}

const rootUrl = "/auth";

const auth = {
  login: async (userCredentials: IAuthLogin) => {
    try {
      const res = await api.post(`${rootUrl}/login`, userCredentials);
      return res;
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  refresh: async (id: string, refresh_token: string) => {
    try {
      const res = await api.post(`${rootUrl}/refresh/${id}`, undefined, { headers: { Authorization: `Bearer ${refresh_token}` } });
      return res;
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  logout: async (id: string, token: string) => {
    try {
      const res = await api.post(`${rootUrl}/logout/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      return res;
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
};

export default auth;
