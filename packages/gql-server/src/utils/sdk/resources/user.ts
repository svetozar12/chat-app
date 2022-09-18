import { GraphQLYogaError } from "@graphql-yoga/node";
import { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
import { Auth, Message, Response } from "../types/common";
import { CreateUser, UpdateUser, User } from "../types/user";

const basePath = "/users";

const user = {
  getUser: async (auth: Auth): Response<User> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.get(`${basePath}/${userId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data.user;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  createUser: async (body: CreateUser): Response<Message> => {
    try {
      const res = await instance.post(basePath, body);
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  updateUser: async (auth: Auth, body?: UpdateUser): Response<Message> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.put(`${basePath}?user_id=${userId}`, body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  delteUser: async (auth: Auth): Response<Message> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.delete(`${basePath}/${userId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
};

export default user;
