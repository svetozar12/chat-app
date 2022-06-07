import { api } from "../index";

interface IChat {
  user_id: string;
  invite_id: string;
  user1: string;
  user2: string;
}

const rootUrl = "/chat-room";

const chats = {
  getAll: async (user_id: string, token: string) => {
    return await api.get(`${rootUrl}/?user_id=${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getById: async (chat_id: string, user_id: string, token: string) => {
    return await api.get(`${rootUrl}/${chat_id}?user_id=${user_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  create: async (user: IChat) => {
    return await api.post(`${rootUrl}`, {
      data: user,
    });
  },
  update: async (chat_id: string, username: string, user_id: string, token: string) => {
    return await api.delete(`${rootUrl}/${chat_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { user_id, username },
    });
  },
  delete: async (chat_id: string, user_id: string, token: string) => {
    return await api.delete(`${rootUrl}/${chat_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { user_id },
    });
  },
};

export default chats;
