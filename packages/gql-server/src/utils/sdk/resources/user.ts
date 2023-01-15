import { myArrayQry } from '../../makeQueryArray';
import makeRequest, { Method } from '../../makeRequest';
import { Auth, Message, Response } from '../types/common';
import { CreateUser, UpdateUser } from '../types/user';
const basePath = '/users';

const user = {
  getUser: async (auth: Auth): Response<any | { __typename: 'Error'; message: string }> => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}/${userId}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  getUserList: async (auth: Auth, userIds: string[]): Response<any | { __typename: 'Error'; message: string }> => {
    const { AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}?${myArrayQry(userIds, 'userIds')}`, undefined, {
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
