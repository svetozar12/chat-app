import AxiosErrorHandler from "../../utils/AxiosErrorHandler";
import { api } from "../index";

type Status = "accepted" | "recieved" | "declined";

const rootUrl = "/invites";

const invite = {
  getAllByReciever: async (user_id: string, token: string, status?: Status) => {
    try {
      return await api.get(`${rootUrl}/${user_id}${status ? "?status=".concat(status) : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  getAllByInviter: async (user_id: string, token: string, status?: Status) => {
    try {
      return await api.get(`${rootUrl}/inviter/${user_id}${status ? "?".concat(status) : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  create: async (user_id: string, reciever: string, token: string) => {
    try {
      return await api.post(
        `${rootUrl}`,
        { reciever, user_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  createGroupChat: async (usersData: string[]) => {
    try {
      return await api.post(`${rootUrl}/group-chat`, {
        data: { usersData },
      });
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
  update: async (user_id: string, invite_id: string, status: Status, token: string) => {
    try {
      return await api.put(
        `${rootUrl}/${invite_id}`,
        { status, user_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error: any) {
      return AxiosErrorHandler(error);
    }
  },
};

export default invite;
