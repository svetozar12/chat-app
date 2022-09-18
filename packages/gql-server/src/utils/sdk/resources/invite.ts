import { GraphQLYogaError } from "@graphql-yoga/node";
import { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
import { Auth, Status } from "../types/common";

const basePath = "/invites";

const invite = {
  getAllByReciever: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.get(
        `${basePath}/${userId}${status ? "?status=".concat(status) : ""}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  getAllByInviter: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.get(
        `${basePath}/inviter/${userId}${status ? "?".concat(status) : ""}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  create: async (auth: Auth, reciever: string) => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.post(
        `${basePath}`,
        { reciever, userId },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  createGroupChat: async (usersData: string[]) => {
    try {
      const res = await instance.post(`${basePath}/group-chat`, {
        data: { usersData },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  update: async (auth: Auth, invite_id: string, status: Status) => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.put(
        `${basePath}/${invite_id}`,
        { status, userId },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
};

export default invite;
