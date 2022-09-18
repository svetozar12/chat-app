import { AuthModel, Invite } from '@chat-app/gql-server';
import { client } from '../index';

const rootUrl = '';

export interface IInvite {
  user_id: string;
  token: string;
  status?: 'accepted' | 'declined' | 'recieved';
}

const invite = {
  getAllByReciever: async (auth: AuthModel, status: string): Promise<Invite> => {
    try {
      const condition = status ? `status:"${status}"` : '';

      const res = await client(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByReciever(auth: "${auth}",status:"${status}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });

      const {
        data: {
          data: { getInvitesByReciever },
        },
      } = res;

      if (!getInvitesByReciever) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return getInvitesByReciever;
    } catch (error) {
      return error;
    }
  },

  getAllByInviter: async (auth: AuthModel, status: string): Promise<Invite> => {
    try {
      const condition = status ? `status:"${status}"` : '';
      const res = await client(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByInviter(auth: "${auth}",status:"${status}",${condition}) {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });

      const {
        data: {
          data: { getInvitesByInviter },
        },
      } = res;

      if (!getInvitesByInviter) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return getInvitesByInviter;
    } catch (error) {
      return error;
    }
  },

  create: async (auth: AuthModel, reciever: string): Promise<Invite> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          createInvite(auth: "${auth}",reciever:"${reciever}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });

      const {
        data: {
          data: { createInvite },
        },
      } = res;

      if (!createInvite) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return createInvite;
    } catch (error) {
      return error;
    }
  },

  createGroupChat: async (usersData: string[]) => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          createInviteGroupChat(usersData:${usersData}) {
            data
            Message
          }
         }`,
        },
      });

      const {
        data: {
          data: { createInviteGroupChat },
        },
      } = res;

      if (!createInviteGroupChat) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return createInviteGroupChat;
    } catch (error) {
      return error;
    }
  },

  update: async (auth: AuthModel, invite_id: string, status: string) => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          updateInvite(auth: "${auth}",invite_id:"${invite_id}",status:"${status}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });

      const {
        data: {
          data: { updateInvite },
        },
      } = res;

      if (!updateInvite) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return updateInvite;
    } catch (error) {
      return false;
    }
  },
};

export default invite;
