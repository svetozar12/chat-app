import { api } from "../api_helper";

const rootUrl = "";

export interface IUser {
  username: string;
  email: string;
  gender: "male" | "female";
}

const user = {
  getById: async (user_id: string, token: string): Promise<any> => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        query {
          getUser(user_id: "${user_id}",token:"${token}") {
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

  create: async (username: string, email: string, password: string, gender: "male" | "female" | "other") => {
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

  update: async (user_id: string, token: string, user: IUser) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          updateUser(user_id:"${user_id}",user:{username: "${user.username}",email:"${user.email}",gender:"${user.gender}"},token:"${token}") {
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

  delete: async (user_id: string, token: string) => {
    try {
      const res = await api(rootUrl, {
        data: {
          query: `
        mutation {
          deleteUser(user_id:"${user_id}",token:"${token}") {
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
