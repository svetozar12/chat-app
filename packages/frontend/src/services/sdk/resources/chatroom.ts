import { AuthModel, Chat, ChatModel, CreateChatMessage, Message } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';

const path = '';

const chat = {
  getAll: async (auth: AuthModel): Promise<Chat[]> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
          query {
            getAllChats(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
              _id
              members
            }
          }`,
      path,
    });
  },

  getById: async (chat_id: string, auth: AuthModel): Promise<Chat> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        query {
          getChatById(chat_id: "${chat_id}",auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            _id
            members
          }
         }`,
      path,
    });
  },

  create: async (chat: ChatModel, auth: AuthModel): Promise<CreateChatMessage> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        mutation {
          createChat(chat:${chat},auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            data {
              _id
              members
            }
            Message
          }
         }`,
      path,
    });
  },

  update: async (auth: AuthModel, chat_id: string, username?: string, usersData?: string[]): Promise<Chat> => {
    const condition = username ? `username:"${username}"` : `usersData:"${usersData}"`;
    const { userId, AccessToken } = auth;

    return makeRequest({
      gqlQuery: `
        mutation {
          updateChat(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id:"${chat_id}",${condition}) {
            _id
            memberrs
          }
         }`,
      path,
    });
  },

  delete: async (auth: AuthModel, chat_id: string): Promise<Message> => {
    const { userId, AccessToken } = auth;

    return makeRequest({
      gqlQuery: `
        mutation {
          deleteChat(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id:"${chat_id}") {
            Message
          }
         }`,
      path,
    });
  },
};

export default chat;