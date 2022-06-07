import { api } from "../index";

interface IUser {
  username: string;
  password: string;
  email: string;
  gender: "Male" | "Female" | "Other";
}

const rootUrl = "/users";

const user = {
  getById: async (id: string, token: string) => {
    return await api.get(`${rootUrl}/${id}`, { headers: { Aithorizationh: `Bearer ${token}` } });
  },
  create: async (user: IUser) => {
    return await api.post(`${rootUrl}`, user);
  },
  update: async (user: IUser, id: string, token: string) => {
    return await api.get(`${rootUrl}/${id}`, { headers: { Aithorizationh: `Bearer ${token}` }, data: user });
  },
  delete: async (id: string, token: string) => {
    return await api.get(`${rootUrl}/${id}`, { headers: { Aithorizationh: `Bearer ${token}` } });
  },
};

export default user;
