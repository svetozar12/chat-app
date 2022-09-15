import axios, { AxiosError } from 'axios';
import { instance } from '..';
import AxiosErrorHandler from '../../AxiosErrorHandler';
import { Chat, CreateChat, UpdateChat } from '../types/chat';
import { Auth, Message } from '../types/common';

const basePath = '/chats';

const chat = {
  getChatById: async (auth: Auth, chatId: string): Promise<{ data: Chat }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.get(`${basePath}/${chatId}?user_id=${userId}`, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  getChats: async (auth: Auth): Promise<{ Message: string; contacts: Chat[] }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.get(`${basePath}?user_id=${userId}`, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  createChat: async (auth: Auth, body: CreateChat): Promise<{ Message: string; chat: Chat }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.post(`${basePath}?user_id=${userId}`, body, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  updateChat: async (chatId: string, auth: Auth, body?: UpdateChat): Promise<{ Message: string; data: Chat }> => {
    const { userId, AccessToken } = auth;
    const Body = { ...body, user_id: userId };
    try {
      return await instance.put(`${basePath}/${chatId}`, Body, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  deleteChat: async (chatId: string, auth: Auth): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return await instance.delete(`${basePath}/${chatId}`, { headers: { Authorization: `Bearer ${AccessToken}` } });
  },
};

export default chat;
