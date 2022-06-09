import { api } from "../api_helper";

const rootUrl = "";

interface IGetMessages {
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
    const condition = query ? `query:{page_size:${query.page_size},page_number:"${query.page_number}"}` : "";
    const res = await api(rootUrl, {
      data: {
        query: `
        query {
          getAllMessages(user_id: "${user_id}",chat_id: "${chat_id}",token:"${token}",${condition}) {
            user_id
            chat_id
            sender
            message
            seenBy
          }
         }`,
      },
    });
    return res.data;
  },

  create: async (user_id: string, chat_id: string, message: string, token: string) => {
    const res = await api(rootUrl, {
      data: {
        query: `
        mutation {
          createMessage(user_id: "${user_id}",chat_id: "${chat_id}",token:"${token}",message:"${message}") {
            user_id
            chat_id
            sender
            message
            seenBy
          }
         }`,
      },
    });
    return res.data;
  },

  update: async (user_id: string, message_id: string, newMessage: string, token: string) => {
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
    return res.data;
  },

  delete: async (user_id: string, message_id: string, token: string) => {
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
    return res.data;
  },
};

export default message;
