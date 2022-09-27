import {
  AuthModel,
  Chat,
  ChatModel,
  CreateChatMessage,
  Message,
  MutationCreateChatArgs,
  MutationDeleteChatArgs,
  MutationUpdateChatArgs,
  QueryGetAllChatsArgs,
  QueryGetChatByIdArgs,
} from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';

const path = '';

const chat = {
  getAll: async (args: QueryGetAllChatsArgs): Promise<Chat[]> => {
    const {
      auth: { userId, AccessToken },
    } = args;
    return makeRequest(
      {
        gqlQuery: `
          query {
            getAllChats(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
              _id
              members
            }
          }`,
        path,
      },
      'getAllChats',
    );
  },

  getById: async (args: QueryGetChatByIdArgs): Promise<Chat> => {
    const {
      auth: { userId, AccessToken },
      chat_id,
    } = args;
    return makeRequest(
      {
        gqlQuery: `
        query {
          getChatById(chat_id: "${chat_id}",auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            _id
            members
          }
         }`,
        path,
      },
      'getChatById',
    );
  },

  create: async (args: MutationCreateChatArgs): Promise<CreateChatMessage> => {
    const {
      auth: { userId, AccessToken },
      chat: { invite_id, user1, user2, user_id },
    } = args;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          createChat(chat:{invite_id:"${invite_id}",user1:"${user1}",user2:"${user2}",user_id:"${user_id}"},auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            data {
              _id
              members
            }
            Message
          }
         }`,
        path,
      },
      'createChat',
    );
  },

  update: async (args: MutationUpdateChatArgs): Promise<Chat> => {
    const {
      auth: { userId, AccessToken },
      chat_id,
      username,
      usersData,
    } = args;
    const condition = username ? `username:"${username}"` : `usersData:"${usersData}"`;

    return makeRequest(
      {
        gqlQuery: `
        mutation {
          updateChat(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id:"${chat_id}",${condition}) {
            _id
            memberrs
          }
         }`,
        path,
      },
      'updateChat',
    );
  },

  delete: async (args: MutationDeleteChatArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
      chat_id,
    } = args;

    return makeRequest(
      {
        gqlQuery: `
        mutation {
          deleteChat(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id:"${chat_id}") {
            Message
          }
         }`,
        path,
      },
      'deleteChat',
    );
  },
};

export default chat;
