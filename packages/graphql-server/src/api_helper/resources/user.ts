import AxiosErrorHandler from "../../utils/AxiosErrorHandler";
import { api } from "../index";

interface IUser {
  username: string;
  email: string;
  gender: "Male" | "Female" | "Other";
}

const rootUrl = "/users";

const user = {
  getById: async (id: string, token: string) => {
    try {
      return await api.get(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  create: async (user: IUser) => {
    try {
      return await api.post(`${rootUrl}`, user);
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  update: async (user: IUser, id: string, token: string) => {
    try {
      return await api.put(`${rootUrl}/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  delete: async (id: string, token: string) => {
    try {
      return await api.delete(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
};

export default user;
