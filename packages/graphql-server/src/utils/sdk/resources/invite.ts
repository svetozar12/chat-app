import { AxiosError } from 'axios';
import { instance } from '..';
import AxiosErrorHandler from '../../AxiosErrorHandler';
import { Auth, Status } from '../types/common';

const basePath = '/invites';

const invite = {
  getAllByReciever: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.get(`${basePath}/${userId}${status ? '?status='.concat(status) : ''}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error) {
      return AxiosErrorHandler(error as AxiosError);
    }
  },
  getAllByInviter: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.get(`${basePath}/inviter/${userId}${status ? '?'.concat(status) : ''}`, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error) {
      return AxiosErrorHandler(error as AxiosError);
    }
  },
  create: async (auth: Auth, reciever: string) => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.post(
        `${basePath}`,
        { reciever, userId },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
    } catch (error) {
      return AxiosErrorHandler(error as AxiosError);
    }
  },
  createGroupChat: async (usersData: string[]) => {
    try {
      return await instance.post(`${basePath}/group-chat`, {
        data: { usersData },
      });
    } catch (error) {
      return AxiosErrorHandler(error as AxiosError);
    }
  },
  update: async (auth: Auth, invite_id: string, status: Status) => {
    const { userId, AccessToken } = auth;
    try {
      return await instance.put(
        `${basePath}/${invite_id}`,
        { status, userId },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        },
      );
    } catch (error) {
      return AxiosErrorHandler(error as AxiosError);
    }
  },
};

export default invite;
