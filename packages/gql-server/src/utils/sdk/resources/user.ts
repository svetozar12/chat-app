import makeRequest, { Method } from '../../makeRequest';
import { Auth, Message, Response } from '../types/common';
import { CreateUser, UpdateUser } from '../types/user';
const basePath = '/users';

import { User } from '@chat-app/backend';

const user = {
  getUser: async (auth: Auth): Response<User | { __typename: 'Error'; message: string }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}/${userId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  createUser: async (body: CreateUser): Response<Message | { __typename: 'Error'; message: string }> => {
    return makeRequest(Method.POST, basePath, body);
  },
  updateUser: async (auth: Auth, body?: UpdateUser): Response<Message | { __typename: 'Error'; message: string }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.PUT, `${basePath}?user_id=${userId}`, body, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  delteUser: async (auth: Auth): Response<Message | { __typename: 'Error'; message: string }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.DELETE, `${basePath}/${userId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
};

export default user;
