import { AuthModel, GetUser, Message, UpdateUserModel, UserModel } from '@chat-app/gql-server';
import { client } from '../index';

const rootUrl = '';

export interface IUser {
  username: string;
  email: string;
  gender: 'male' | 'female';
}

const user = {
  getById: async (auth: AuthModel): Promise<GetUser> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        query {
          getUser(auth: "${auth}") {
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

  create: async (user: UserModel): Promise<Message> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          createUser(user:"${user}") {
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

  update: async (auth: AuthModel, user: UpdateUserModel): Promise<Message> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          updateUser(auth:"${auth}",user:"${user}") {
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

  delete: async (auth: AuthModel): Promise<Message> => {
    try {
      const res = await client(rootUrl, {
        data: {
          query: `
        mutation {
          deleteUser(auth:"${auth}") {
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
