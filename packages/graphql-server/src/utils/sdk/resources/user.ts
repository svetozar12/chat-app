import { AxiosError } from 'axios';
import { instance } from '..';
import AxiosErrorHandler from '../../AxiosErrorHandler';
import { Auth, Message } from '../types/common';
import { CreateUser, UpdateUser, User } from '../types/user';

const basePath = '/users';

const user = {
  getUser: async (auth: Auth): Promise<User | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.get(`${basePath}/${userId}`, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  createUser: async (body: CreateUser): Promise<Message | { error: AxiosError }> => {
    try {
      return await instance.post(basePath, body);
    } catch (error: any) {
      return error;
    }
  },
  updateUser: async (auth: Auth, body?: UpdateUser): Promise<Message | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.put(`${basePath}?user_id=${userId}`, body, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
  delteUser: async (auth: Auth): Promise<Message | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.delete(`${basePath}/${userId}`, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
};

export default user;
