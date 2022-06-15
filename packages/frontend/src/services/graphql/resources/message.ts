import { api } from "../api_helper";

const rootUrl = "";

export interface IGetMessages {
  user_id: string;
  chat_id: string;
  token: string;
  query?: {
    page_size: number;
    page_number: number;
  };
}

const message = {
  getAll: async ({ user_id, chat_id, token, query }: IGetMessages) => {
    try {
      const condition = query ? `,query:{page_size:${query.page_size},page_number:${query.page_number}}` : "";

      const res = await api(rootUrl, {
        data: {
          query: `
          query {
          getAllMessages(user_id: "${user_id}",chat_id:"${chat_id}"${condition},token:"${token}") {
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

  create: async (user_id: string, chat_id: string, _message: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createMessage(user_id: "${user_id}",chat_id: "${chat_id}",token:"${token}",message:"${_message}") {
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

  update: async (user_id: string, message_id: string, newMessage: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateMessage(user_id: "${user_id}",message_id: "${message_id}",token:"${token}",newMessage:"${newMessage}") {
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

  delete: async (user_id: string, message_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteMessage(user_id: "${user_id}",message_id: "${message_id}",token:"${token}") {
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
