import AxiosErrorHandler from "../../utils/AxiosErrorHandler";
import { api } from "../index";

interface IQuery {
  page_size: number;
  page_number: number;
}

const rootUrl = "/messages";

const message = {
  getAll: async (chat_id: string, user_id: string, query: IQuery, token: string) => {
    try {
      const res = await api.get(
        `${rootUrl}/${chat_id}?user_id=${user_id}${query ? `&&page_size=${query.page_size}&&page_number=${query.page_number}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res;
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  create: async (chat_id: string, user_id: string, message: string, token: string) => {
    try {
      return await api.post(
        `${rootUrl}/${chat_id}`,
        { user_id, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  update: async (message_id: string, user_id: string, newMessage: string, token: string) => {
    try {
      return await api.put(`${rootUrl}/${message_id}`, {
        data: { user_id, newMessage },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  delete: async (message_id: string, user_id: string, token: string) => {
    try {
      return await api.delete(`${rootUrl}/${message_id}`, {
        data: { user_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
};
export default message;
