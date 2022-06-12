import { api } from "../api_helper";

const rootUrl = "";

interface IChat {
  user_id: string;
  invite_id: string;
  user1: string;
  user2: string;
}

const chat = {
  getAll: async (user_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
          query {
            getAllChats(user_id:"${user_id}",token:"${token}") {
              _id
              members
            }
          }`,
        },
      });
      console.log(res.data.data);

      return res.data.data;
    } catch (error) {
      return false;
    }
  },

  getById: async (chat_id: string, user_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getChatById(chat_id: "${chat_id}",user_id: "${user_id}",token:"${token}") {
            _id
            members
          }
         }`,
        },
      });
      return res.data;
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
          createChat(chat:{user_id:"${chat.user_id}",invite_id:"${chat.invite_id}",user1:"${chat.user1}",user2:"${chat.user2}"},token:"${token}") {
            data
            Message
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },

  update: async (user_id: string, chat_id: string, token: string, username?: String, usersData?: string[]) => {
    try {
      const condition = username ? `username:"${username}"` : `usersData:"${usersData}"`;

      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateChat(user_id:"${user_id}",chat_id:"${chat_id}",token:"${token}",${condition}) {
            _id
            memberrs
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },

  delete: async (user_id: string, chat_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteChat(user_id:"${user_id}",chat_id:"${chat_id}",token:"${token}") {
            Message
          }
         }`,
        },
      });
      return res.data;
    } catch (error) {
      return false;
    }
  },
};

export default chat;
