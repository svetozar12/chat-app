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
    return await api.get(`${rootUrl}/${user_id}?chat_id=${chat_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  create: async (user: IChat, token: string) => {
    return await api.post(`${rootUrl}`, user, { headers: { Authorization: `Bearer ${token}` } });
  },
  update: async (message_id: string, user_id: string, token: string, username?: string, usersData?: string[]) => {
    if (usersData)
      return await api.put(`${rootUrl}/${message_id}`, { user_id, usersData }, { headers: { Authorization: `Bearer ${token}` } });

    return await api.put(
      `${rootUrl}/${message_id}`,
      { user_id, username },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  },
  delete: async (message_id: string, user_id: string, token: string) => {
    return await api.delete(`${rootUrl}/${message_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { user_id },
    });
  },
};

export default chats;
