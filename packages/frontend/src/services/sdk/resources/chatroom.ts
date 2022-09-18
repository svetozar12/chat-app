import { AuthModel, Chat, ChatModel, CreateChatMessage, Message } from '@chat-app/gql-server';
import { client } from '../index';
const rootUrl = '';

const chat = {
  getAll: async (auth: AuthModel): Promise<Chat[]> => {
    const { userId, AccessToken } = auth;
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
          query {
            getAllChats(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
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

  getById: async (chat_id: string, auth: AuthModel): Promise<Chat> => {
    const { userId, AccessToken } = auth;
    const res = await client(rootUrl, {
      data: {
        query: `
        query {
          getChatById(chat_id: "${chat_id}",auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
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
  },

  create: async (chat: ChatModel, auth: AuthModel): Promise<CreateChatMessage> => {
    const res = await client(rootUrl, {
      data: {
        query: `
        mutation {
          createChat(chat:${chat},auth:${auth}) {
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
  },

  update: async (auth: AuthModel, chat_id: string, username?: string, usersData?: string[]): Promise<Chat> => {
    const condition = username ? `username:"${username}"` : `usersData:"${usersData}"`;

    const res = await client(rootUrl, {
      data: {
        query: `
        mutation {
          updateChat(auth:"${auth}",chat_id:"${chat_id}",${condition}) {
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
  },

  delete: async (auth: AuthModel, chat_id: string): Promise<Message> => {
    const res = await client(rootUrl, {
      data: {
        query: `
        mutation {
          deleteChat(auth:"${auth}",chat_id:"${chat_id}") {
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
  },
};

export default chat;
