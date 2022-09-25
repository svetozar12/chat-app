import { GraphQLYogaError } from '@graphql-yoga/node';
import { instance } from '..';
import makeRequest, { Method } from '../../makeRequest';
import { Auth, Status } from '../types/common';

const basePath = '/invites';

const invite = {
  getAllByReciever: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}/${userId}${status ? '?status='.concat(status) : ''}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  getAllByInviter: async (auth: Auth, status?: Status) => {
    const { userId, AccessToken } = auth;
    return makeRequest(Method.GET, `${basePath}/inviter/${userId}${status ? '?'.concat(status) : ''}`, undefined, {
      headers: { Authorization: `Bearer ${AccessToken}` },
    });
  },
  create: async (auth: Auth, reciever: string) => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      Method.POST,
      basePath,
      { reciever, user_id: userId },
      {
        headers: { Authorization: `Bearer ${AccessToken}` },
      },
    );
  },
  createGroupChat: async (usersData: string[]) => {
    return makeRequest(Method.POST, `${basePath}/group-chat`, {
      data: { usersData },
    });
  },
  update: async (auth: Auth, invite_id: string, status: Status) => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      Method.PUT,
      `${basePath}/${invite_id}`,
      { status, userId },
      {
        headers: { Authorization: `Bearer ${AccessToken}` },
      },
    );
  },
};

export default invite;
