import { CreateChatMessage, Message, Messages } from "@chat-app/graphql-server";
import { api } from "..";

const rootUrl = "";

export interface IGetMessages {
  userId: string;
  chatId: string;
  token: string;
  query?: {
    page_size: number;
    page_number: number;
  };
}

const message = {
  getAll: async ({
    userId,
    chatId,
    token,
    query,
  }: IGetMessages): Promise<Messages[]> => {
    try {
      const condition =
        query != null
          ? `,query:{page_size:${query.page_size},page_number:${query.page_number}}`
          : "";

      const res = await api(rootUrl, {
        data: {
          query: `
          query {
          getAllMessages(userId: "${userId}",chatId:"${chatId}"${condition},token:"${token}") {
            _id
            userId
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
    } catch (error: any) {
      return error;
    }
  },

  create: async (
    userId: string,
    chatId: string,
    _message: string,
    token: string,
  ): Promise<CreateChatMessage> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createMessage(userId: "${userId}",chat_id: "${chatId}",token:"${token}",message:"${_message}") {
            userId
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

  update: async (
    userId: string,
    messageId: string,
    newMessage: string,
    token: string,
  ): Promise<Message> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateMessage(userId: "${userId}",messageId: "${messageId}",token:"${token}",newMessage:"${newMessage}") {
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

  delete: async (
    userId: string,
    messageId: string,
    token: string,
  ): Promise<Message> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteMessage(userId: "${userId}",messageId: "${messageId}",token:"${token}") {
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
