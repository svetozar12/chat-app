import { GraphQLYogaError } from "@graphql-yoga/node";
import axios, { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
import { Chat, CreateChat, UpdateChat } from "../types/chat";
import { Auth, Message, Response } from "../types/common";

const basePath = "/chats";

const chat = {
  getChatById: async (auth: Auth, chatId: string): Response<Chat> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.get(
        `${basePath}/${chatId}?user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  getChats: async (
    auth: Auth,
  ): Response<{ Message: string; contacts: Chat[] }> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.get(`${basePath}?user_id=${userId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  createChat: async (
    auth: Auth,
    body: CreateChat,
  ): Response<{ Message: string; chat: Chat }> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.post(`${basePath}?user_id=${userId}`, body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  updateChat: async (
    chatId: string,
    auth: Auth,
    body?: UpdateChat,
  ): Response<{ Message: string; chat: Chat }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      const res = await instance.put(`${basePath}/${chatId}`, Body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  deleteChat: async (chatId: string, auth: Auth): Response<Message> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.delete(`${basePath}/${chatId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
};

export default chat;
