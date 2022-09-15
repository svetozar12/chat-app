import { AxiosError } from 'axios';
import { instance } from '..';
import AxiosErrorHandler from '../../AxiosErrorHandler';
import { JWT, Login } from '../types/auth';
import { Auth, Message } from '../types/common';

const basePath = '/auth';

const auth = {
  login: async (body: Login): Promise<JWT | { error: AxiosError }> => {
    try {
      return await instance.post(`${basePath}/login`, body);
    } catch (error: any) {
      return error;
    }
  },
  refresh: async (userId: string, RefreshToken: string): Promise<JWT | { error: AxiosError }> => {
    try {
      return await instance.post(`${basePath}/refresh/${userId}`, { RefreshToken });
    } catch (error: any) {
      return error;
    }
  },
  logout: async (auth: Auth): Promise<Message | { error: AxiosError }> => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.post(`${basePath}/refresh/${userId}`, null, { headers: { Authorization: `Bearer ${AccessToken}` } });
    } catch (error: any) {
      return error;
    }
  },
};

export default auth;
