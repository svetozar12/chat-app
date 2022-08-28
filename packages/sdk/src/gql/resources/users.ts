import { GetUser, Message } from "@chat-app/graphql-server";
import { api } from "..";

const rootUrl = "";

export interface IUser {
  username: string;
  email: string;
  gender: "male" | "female";
}

const user = {
  getById: async (userId: string, token: string): Promise<GetUser> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getUser(userId: "${userId}",token:"${token}") {
            _id
            username
            email
            userAvatar
          }
         }`,
        },
      });

      const {
        data: {
          data: { getUser },
        },
      } = res;

      if (!getUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return getUser;
    } catch (error) {
      return error;
    }
  },

  create: async (
    username: string,
    email: string,
    password: string,
    gender: "Male" | "Female" | "Other",
  ): Promise<Message> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          createUser(user:{username: "${username}",email:"${email}", password: "${password}",gender:"${gender}"}) {
            Message
          }
         }`,
        },
      });

      const {
        data: {
          data: { createUser },
        },
      } = res;
      if (!createUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return createUser;
    } catch (error) {
      return error;
    }
  },

  update: async (
    userId: string,
    token: string,
    user: IUser,
  ): Promise<Message> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateUser(userId:"${userId}",user:{username: "${user.username}",email:"${user.email}",gender:"${user.gender}"},token:"${token}") {
            Message
          }
         }`,
        },
      });
      const {
        data: {
          data: { updateUser },
        },
      } = res;

      if (!updateUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return updateUser;
    } catch (error) {
      return error;
    }
  },

  delete: async (userId: string, token: string): Promise<Message> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteUser(userId:"${userId}",token:"${token}") {
            Message
          }
         }`,
        },
      });
      const {
        data: {
          data: { deleteUser },
        },
      } = res;
      if (!deleteUser) {
        const {
          data: {
            errors: [{ message }],
          },
        } = res;
        throw Error(message);
      }

      return deleteUser;
    } catch (error) {
      return error;
    }
  },
};

export default user;
