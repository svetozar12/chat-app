import { api } from "../index";

type Status = "accepted" | "recieved" | "declined";

const rootUrl = "/invites";

const invite = {
  getAllByReciever: async (user_id: string, token: string, status?: Status) => {
    return await api.get(`${rootUrl}/${user_id}${status ? "?".concat(status) : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getAllByInviter: async (user_id: string, token: string, status?: Status) => {
    return await api.get(`${rootUrl}/inviter/${user_id}${status ? "?".concat(status) : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  create: async (user_id: string, reciever: string, token: string) => {
    return await api.post(`${rootUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { reciever, user_id },
    });
  },
  createGroupChat: async (usersData: string[]) => {
    return await api.post(`${rootUrl}/group-chat`, {
      data: { usersData },
    });
  },
  update: async (user_id: string, status: Status, token: string) => {
    return await api.put(`${rootUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { status, user_id },
    });
  },
};

export default invite;
