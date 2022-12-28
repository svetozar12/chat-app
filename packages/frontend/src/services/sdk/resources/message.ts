import {
  Message,
  Messages,
  MutationCreateMessageArgs,
  MutationDeleteMessageArgs,
  MutationUpdateMessageArgs,
  QueryGetAllMessagesArgs,
} from 'services/generated/graphql';
import makeRequest from 'utils/makeRequest';

const path = '';

const message = {
  getAll: async (args: QueryGetAllMessagesArgs): Promise<Messages[]> => {
    const {
      auth: { AccessToken, userId },
      chat_id,
      query,
    } = args;
    const condition = query ? `,query:{page_size:${query.page_size},page_number:${query.page_number}}` : '';
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

  create: async (args: MutationCreateMessageArgs): Promise<Messages> => {
    const {
      auth: { userId, AccessToken },
      chat_id,
      message,
    } = args;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          createMessage(auth:{userId: "${userId}", AccessToken: "${AccessToken}"},chat_id: "${chat_id}",message:"${message}") {
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

  update: async (args: MutationUpdateMessageArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
      message_id,
      newMessage,
    } = args;
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

  delete: async (args: MutationDeleteMessageArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
      message_id,
    } = args;
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
