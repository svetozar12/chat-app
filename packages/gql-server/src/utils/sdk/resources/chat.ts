import makeRequest, { Method } from "../../makeRequest";
import { Chat, CreateChat, UpdateChat } from "../types/chat";
import { Auth, Message, Response } from "../types/common";

const basePath = "/chats";
const chat = {
  getChatById: async (auth: Auth, chatId: string): Response<Chat> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      Method.GET,
      `${basePath}/${chatId}?user_id=${userId}`,
      undefined,
      {
        headers: { Authorization: `Bearer ${AccessToken}` },
      },
    );
  },
  getChats: async (
    auth: Auth,
  ): Response<{ Message: string; contacts: Chat[] }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}?user_id=${userId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  createChat: async (
    auth: Auth,
    body: CreateChat,
  ): Response<{ Message: string; chat: Chat }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.POST, `${basePath}?user_id=${userId}`, body, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  updateChat: async (
    chatId: string,
    auth: Auth,
    body?: UpdateChat,
  ): Response<{ Message: string; chat: Chat }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    return makeRequest(Method.PUT, `${basePath}/${chatId}`, Body, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  deleteChat: async (chatId: string, auth: Auth): Response<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.DELETE, `${basePath}/${chatId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
};

export default chat;
