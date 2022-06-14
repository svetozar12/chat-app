import { api } from "../api_helper";

const rootUrl = "";

export interface IInvite {
  user_id: string;
  token: string;
  status?: "accepted" | "declined" | "recieved";
}

const invite = {
  getAllByReciever: async ({ user_id, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : "";

      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByReciever(user_id: "${user_id}",token:"${token}",${condition}) {
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

  getAllByInviter: async ({ user_id, token, status }: IInvite) => {
    try {
      const condition = status ? `status:"${status}"` : "";
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getInvitesByInviter(user_id: "${user_id}",token:"${token}",${condition}) {
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

  create: async (user_id: string, reciever: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createInvite(user_id: "${user_id}",reciever:"${reciever}",token:"${token}") {
            _id
            inviter
            reciever
            status
          }
         }`,
        },
      });
      const {
        data: { message },
      } = res;

      if (!message) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return message;
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

  update: async (user_id: string, invite_id: string, status: string, token: string) => {
    try {
      console.log(`
        mutation {
          updateInvite(user_id: "${user_id}",invite_id:"${invite_id}",status:"${status}",token:"${token}") {
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
          updateInvite(user_id: "${user_id}",invite_id:"${invite_id}",status:"${status}",token:"${token}") {
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
