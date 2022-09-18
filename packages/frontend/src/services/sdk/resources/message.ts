import { AuthModel, Message, Messages, Pagination } from '@chat-app/gql-server';
import { client } from '../index';

const rootUrl = '';

const message = {
  getAll: async (auth: AuthModel, chat_id: string, query: Pagination): Promise<Messages[]> => {
    try {
      const condition = query ? `,query:{page_size:${query.page_size},page_number:${query.page_number}}` : '';

      const res = await client(rootUrl, {
        data: {
          query: `
          query {
          getAllMessages(auth: "${auth}",chat_id:"${chat_id}"${condition}) {
            _id
            user_id
            chat_id
            sender
            message
          }
      }`,
        },
      });

      const {
        data: {
          data: { getAllMessages },
        },
      } = res;

      if (!getAllMessages) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return getAllMessages;
    } catch (error) {
      return error;
    }
  },

  create: async (auth: AuthModel, chat_id: string, _message: string): Promise<Messages> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          createMessage(auth: "${auth}",chat_id: "${chat_id}",message:"${_message}") {
            user_id
            chat_id
            sender
            message
            seenBy
          }
         }`,
        },
      });

      const {
        data: {
          data: { createMessage },
        },
      } = res;

      if (!createMessage) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return createMessage;
    } catch (error) {
      return error;
    }
  },

  update: async (auth: AuthModel, message_id: string, newMessage: string): Promise<Message> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          updateMessage(auth: "${auth}",message_id: "${message_id}",newMessage:"${newMessage}") {
            Message
          }
         }`,
        },
      });

      const {
        data: {
          data: { updateMessage },
        },
      } = res;

      if (!updateMessage) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }
      return updateMessage;
    } catch (error) {
      return error;
    }
  },

  delete: async (auth: AuthModel, message_id: string): Promise<Message> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          deleteMessage(auth: "${auth}",message_id: "${message_id}") {
            Message
          }
        }`,
        },
      });
      const {
        data: {
          data: { deleteMessage },
        },
      } = res;

      if (!deleteMessage) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return deleteMessage;
    } catch (error) {
      return error;
    }
  },
};

export default message;
