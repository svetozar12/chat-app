/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../apiHelper';

const rootUrl = '';

export interface IInvite {
  userId: string;
  token: string;
  status?: 'accepted' | 'declined' | 'recieved';
}

const invite = {
  getAllByReciever: async ({ userId, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : '';

      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByReciever(userId: "${userId}",token:"${token}",${condition}) {
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

  getAllByInviter: async ({ userId, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : '';
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByInviter(userId: "${userId}",token:"${token}",${condition}) {
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

  create: async (userId: string, reciever: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createInvite(userId: "${userId}",reciever:"${reciever}",token:"${token}") {
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
      return false;
    }
  },

  createGroupChat: async (usersData: string[]) => {
    try {
      const res = await api(rootUrl, {
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
      return false;
    }
  },

  update: async (userId: string, inviteId: string, status: string, token: string) => {
    try {
      console.log(`
        mutation {
          updateInvite(userId: "${userId}",inviteId:"${inviteId}",status:"${status}",token:"${token}") {
            _id
            inviter
            reciever
            status
          }
         }`);

      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateInvite(userId: "${userId}",inviteId:"${inviteId}",status:"${status}",token:"${token}") {
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
