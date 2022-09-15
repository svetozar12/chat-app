import { AxiosError } from 'axios';
import { instance } from '..';
import AxiosErrorHandler from '../../AxiosErrorHandler';
import { Chat, CreateChat, UpdateChat } from '../types/chat';
import { Auth, Message } from '../types/common';
import { ChatMessage, CreateMessage, PaginationQuery } from '../types/message';

const basePath = '/messages';

const message = {
  getMessages: async (
    auth: Auth,
    chatId: string,
    query?: PaginationQuery,
  ): Promise<{ Message: string; data: ChatMessage[] } | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    const { page_size, page_number } = query as PaginationQuery;
    try {
      return await instance.get(`${basePath}/${chatId}?user_id=${userId}&&page_size=${page_size}&&page_number=${page_number}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error: any) {
      return error;
    }
  },
  createMessage: async (auth: Auth, chatId: string, body: CreateMessage): Promise<{ data: ChatMessage } | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      return await instance.post(`${basePath}/${chatId}`, Body, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  updateMessage: async (auth: Auth, messageId: string, body: CreateMessage): Promise<Message | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      return await instance.put(`${basePath}/${messageId}`, Body, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error: any) {
      return error;
    }
  },
  deleteMessage: async (auth: Auth, messageId: string): Promise<Message | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.delete(`${basePath}/${messageId}?user_id=${userId}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error: any) {
      return error;
    }
  },
};

export default message;
