import {
  AuthModel,
  Invite,
  MutationCreateInviteArgs,
  MutationCreateInviteGroupChatArgs,
  MutationUpdateInviteArgs,
  QueryGetInvitesByInviterArgs,
  QueryGetInvitesByRecieverArgs,
} from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';

const path = '';

export interface IInvite {
  user_id: string;
  token: string;
  status?: 'accepted' | 'declined' | 'recieved';
}

const invite = {
  getAllByReciever: async (args: QueryGetInvitesByRecieverArgs): Promise<Invite[]> => {
    const {
      auth: { userId, AccessToken },
      status,
    } = args;
    const condition = status ? `status:${status}` : '';
    return makeRequest(
      {
        gqlQuery: `
        query {
          getInvitesByReciever(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        path,
      },
      'getInvitesByReciever',
    );
  },

  getAllByInviter: async (args: QueryGetInvitesByInviterArgs): Promise<Invite[]> => {
    const {
      auth: { userId, AccessToken },
      status,
    } = args;
    const condition = status ? `status:${status}` : '';

    return makeRequest(
      {
        gqlQuery: `
        query {
          getInvitesByInviter(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        path,
      },
      'getInvitesByInviter',
    );
  },

  create: async (args: MutationCreateInviteArgs): Promise<Invite> => {
    const {
      auth: { userId, AccessToken },
      reciever,
    } = args;

    return makeRequest(
      {
        gqlQuery: `
        mutation {
          createInvite(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},reciever:"${reciever}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        path,
      },
      'createInvite',
    );
  },

  createGroupChat: async (args: MutationCreateInviteGroupChatArgs) => {
    const { usersData } = args;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          createInviteGroupChat(usersData:${usersData}) {
            data
            Message
          }
         }`,
        path,
      },
      'createInviteGroupChat',
    );
  },

  update: async (args: MutationUpdateInviteArgs) => {
    const { auth, invite_id, status } = args;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          updateInvite(auth: "${auth}",invite_id:"${invite_id}",status:${status}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        path,
      },
      'updateInvite',
    );
  },
};

export default invite;
