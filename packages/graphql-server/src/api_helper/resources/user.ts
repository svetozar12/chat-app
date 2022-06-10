import { api } from "../index";

interface IUser {
  username: string;
  email: string;
  gender: "Male" | "Female" | "Other";
}

const rootUrl = "/users";

const user = {
  getById: async (id: string, token: string) => {
    return await api.get(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  },
  create: async (user: IUser) => {
    return await api.post(`${rootUrl}`, user);
  },
  update: async (user: IUser, id: string, token: string) => {
    return await api.put(`${rootUrl}/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });
  },
  delete: async (id: string, token: string) => {
    return await api.delete(`${rootUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  },
};

export default user;
