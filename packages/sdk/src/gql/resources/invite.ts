import { CreateChatMessage, Invite } from "@chat-app/graphql-server";
import { api } from "..";

const rootUrl = "";

export interface IInvite {
  userId: string;
  token: string;
  status?: "accepted" | "declined" | "recieved";
}

const invite = {
  getAllByReciever: async ({
    userId,
    token,
    status,
  }: IInvite): Promise<Invite[]> => {
    try {
      const condition = status ? `status:"${status}"` : "";

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
    } catch (error: any) {
      return error;
    }
  },

  getAllByInviter: async ({
    userId,
    token,
    status,
  }: IInvite): Promise<Invite[]> => {
    try {
      const condition = status ? `status:"${status}"` : "";
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
    } catch (error: any) {
      return error;
    }
  },

  create: async (
    userId: string,
    reciever: string,
    token: string,
  ): Promise<Invite> => {
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
      return error;
    }
  },

  createGroupChat: async (usersData: string[]): Promise<CreateChatMessage> => {
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
      return error;
    }
  },

  update: async (
    userId: string,
    inviteId: string,
    status: string,
    token: string,
  ): Promise<Invite> => {
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
      return error;
    }
  },
};

export default invite;
