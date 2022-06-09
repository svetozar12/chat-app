import { api } from "../api_helper";

const rootUrl = "";

interface IUser {
  username: string;
  email: string;
  gender: "male" | "female" | "other";
}

const user = {
  getById: async (user_id: string, token: string) => {
    const res = await api(rootUrl, {
      data: {
        query: `
        query {
          getUser(user_id: "${user_id}",token:"${token}") {
            _id
            username
            email
          }
         }`,
      },
    });
    return res.data.data.loginUser;
  },

  create: async (username: string, email: string, password: string, gender: "male" | "female" | "other") => {
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
    return res.data.data.loginUser;
  },

  update: async (user_id: string, token: string, user: IUser) => {
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
    return res.data.data.loginUser;
  },

  delete: async (user_id: string, token: string) => {
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
    return res.data.data.loginUser;
  },
};

export default user;
