import { api } from "../index";
import AxiosErrorHandler from "../../utils/AxiosErrorHandler";
import { AxiosError } from "axios";

interface IChat {
  user_id: string;
  invite_id: string;
  user1: string;
  user2: string;
}

const rootUrl = "/chat-room";

const chats = {
  getAll: async (user_id: string, token: string) => {
    try {
      return await api.get(`${rootUrl}/?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  getById: async (chat_id: string, user_id: string, token: string) => {
    try {
      return await api.get(`${rootUrl}/${user_id}?chat_id=${chat_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  create: async (user: IChat, token: string) => {
    try {
      return await api.post(`${rootUrl}`, user, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  update: async (message_id: string, user_id: string, token: string, username?: string, usersData?: string[]) => {
    try {
      if (usersData)
        return await api.put(`${rootUrl}/${message_id}`, { user_id, usersData }, { headers: { Authorization: `Bearer ${token}` } });

      return await api.put(
        `${rootUrl}/${message_id}`,
        { user_id, username },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  delete: async (message_id: string, user_id: string, token: string) => {
    try {
      return await api.delete(`${rootUrl}/${message_id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { user_id },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
};

export default chats;
