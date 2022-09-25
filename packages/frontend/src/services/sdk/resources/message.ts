import { AuthModel, Message, Messages, Pagination } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';
import { client } from '../index';

const path = '';

const message = {
  getAll: async (auth: AuthModel, chat_id: string, query: Pagination): Promise<Messages[]> => {
    const condition = query ? `,query:{page_size:${query.page_size},page_number:${query.page_number}}` : '';
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
          query {
          getAllMessages(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id:"${chat_id}"${condition}) {
            _id
            user_id
            chat_id
            sender
            message
          }
      }`,
        path,
      },
      'getAllMessages',
    );
  },

  create: async (auth: AuthModel, chat_id: string, _message: string): Promise<Messages> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          createMessage(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id: "${chat_id}",message:"${_message}") {
            user_id
            chat_id
            sender
            message
            seenBy
          }
         }`,
        path,
      },
      'createMessage',
    );
  },

  update: async (auth: AuthModel, message_id: string, newMessage: string): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          updateMessage(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},message_id: "${message_id}",newMessage:"${newMessage}") {
            Message
          }
         }`,
        path,
      },
      'updateMessage',
    );
  },

  delete: async (auth: AuthModel, message_id: string): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          deleteMessage(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},message_id: "${message_id}") {
            Message
          }
        }`,
        path,
      },
      'deleteMessage',
    );
  },
};

export default message;
