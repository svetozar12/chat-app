import { AuthModel, Invite } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';
import { client } from '../index';

const path = '';

export interface IInvite {
  user_id: string;
  token: string;
  status?: 'accepted' | 'declined' | 'recieved';
}

const invite = {
  getAllByReciever: async (auth: AuthModel, status: string): Promise<Invite> => {
    const { userId, AccessToken } = auth;
    const condition = status ? `status:"${status}"` : '';
    return makeRequest({
      gqlQuery: `
        query {
          getInvitesByReciever(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},status:"${status}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
      path,
    });
  },

  getAllByInviter: async (auth: AuthModel, status: string): Promise<Invite> => {
    const condition = status ? `status:"${status}"` : '';
    const { userId, AccessToken } = auth;

    return makeRequest({
      gqlQuery: `
        query {
          getInvitesByInviter(auth:{userId: "${userId}", AccessToken: "${AccessToken}",status:"${status}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
      path,
    });
  },

  create: async (auth: AuthModel, reciever: string): Promise<Invite> => {
    const { userId, AccessToken } = auth;

    return makeRequest({
      gqlQuery: `
        mutation {
          createInvite(auth:{userId: "${userId}", AccessToken: "${AccessToken}",reciever:"${reciever}") {
            _id
            inviter
            reciever
            status
          }
         }`,
      path,
    });
  },

  createGroupChat: async (usersData: string[]) => {
    return makeRequest({
      gqlQuery: `
        mutation {
          createInviteGroupChat(usersData:${usersData}) {
            data
            Message
          }
         }`,
      path,
    });
  },

  update: async (auth: AuthModel, invite_id: string, status: string) => {
    return makeRequest({
      gqlQuery: `
        mutation {
          updateInvite(auth: "${auth}",invite_id:"${invite_id}",status:"${status}") {
            _id
            inviter
            reciever
            status
          }
         }`,
      path,
    });
  },
};

export default invite;
