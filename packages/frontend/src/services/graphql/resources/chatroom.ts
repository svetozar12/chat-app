import { api } from '../apiHelper';

const rootUrl = '';

export interface IChat {
  userId: string;
  invite_id: string;
  user1: string;
  user2: string;
}

const chat = {
  getAll: async (userId: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
          query {
            getAllChats(userId:"${userId}",token:"${token}") {
              _id
              members
            }
          }`,
        },
      });

      const {
        data: {
          data: { getAllChats },
        },
      } = res;

      if (!getAllChats) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return getAllChats;
    } catch (error) {
      return error;
    }
  },

  getById: async (chatId: string, userId: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getChatById(chatId: "${chatId}",userId: "${userId}",token:"${token}") {
            _id
            members
          }
         }`,
        },
      });

      const {
        data: {
          data: { getChatById },
        },
      } = res;

      if (!getChatById) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return getChatById;
    } catch (error) {
      return false;
    }
  },

  create: async (chat: IChat, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createChat(chat:{userId:"${chat.userId}",invite_id:"${chat.invite_id}",user1:"${chat.user1}",user2:"${chat.user2}"},token:"${token}") {
            data {
              _id
              members
            }
            Message
          }
         }`,
        },
      });

      const {
        data: {
          data: { createChat },
        },
      } = res;

      if (!createChat) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return createChat;
    } catch (error) {
      return false;
    }
  },

  update: async (userId: string, chatId: string, token: string, username?: string, usersData?: string[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const condition = username ? `username:"${username}"` : `usersData:"${usersData}"`;

      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateChat(userId:"${userId}",chatId:"${chatId}",token:"${token}",${condition}) {
            _id
            memberrs
          }
         }`,
        },
      });

      const {
        data: {
          data: { updateChat },
        },
      } = res;

      if (!updateChat) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return updateChat;
    } catch (error) {
      return false;
    }
  },

  delete: async (userId: string, chatId: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteChat(userId:"${userId}",chatId:"${chatId}",token:"${token}") {
            Message
          }
         }`,
        },
      });

      const {
        data: {
          data: { deleteChat },
        },
      } = res;
      if (!deleteChat) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return deleteChat;
    } catch (error) {
      return false;
    }
  },
};

export default chat;
