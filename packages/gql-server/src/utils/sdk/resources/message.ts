import { GraphQLYogaError } from "@graphql-yoga/node";
import { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
import { Chat, CreateChat, UpdateChat } from "../types/chat";
import { Auth, Message, Response } from "../types/common";
import { ChatMessage, CreateMessage, PaginationQuery } from "../types/message";

const basePath = "/messages";

const message = {
  getMessages: async (
    auth: Auth,
    chatId: string,
    query?: PaginationQuery,
  ): Response<{ Message: string; data: ChatMessage[] }> => {
    const { userId, AccessToken } = auth;
    const { page_size, page_number } = query as PaginationQuery;
    try {
      const res = await instance.get(
        `${basePath}/${chatId}?user_id=${userId}&&page_size=${page_size}&&page_number=${page_number}`,
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  createMessage: async (
    auth: Auth,
    chatId: string,
    body: CreateMessage,
  ): Response<{ data: ChatMessage }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      const res = await instance.post(`${basePath}/${chatId}`, Body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  updateMessage: async (
    auth: Auth,
    messageId: string,
    body: CreateMessage,
  ): Response<Message> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      const res = await instance.put(`${basePath}/${messageId}`, Body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  deleteMessage: async (auth: Auth, messageId: string): Response<Message> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await instance.delete(
        `${basePath}/${messageId}?user_id=${userId}`,
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

export default message;
