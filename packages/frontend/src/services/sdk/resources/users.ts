import { AuthModel, GetUser, Message, UpdateUserModel, UserModel } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';

const path = '';

export interface IUser {
  username: string;
  email: string;
  gender: 'male' | 'female';
}

const user = {
  getById: async (auth: AuthModel): Promise<GetUser> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        query {
          getUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}"}) {
            _id
            username
            email
            userAvatar
          }
         }`,
        path,
      },
      'getUser',
    );
  },

  create: async (user: UserModel): Promise<Message> => {
    const { username, email, gender, password } = user;
    return makeRequest(
      {
        gqlQuery: `
        mutation createUser{
          createUser(user:{username: "${username}", password: "${password}", email: "${email}", gender: ${gender}}) {
            Message
          }
         }`,
        path,
      },
      'createUser',
    );
  },

  update: async (auth: AuthModel, user: UpdateUserModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    const { username, email, gender } = user;

    return makeRequest(
      {
        gqlQuery: `
        mutation updateUser{
          updateUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}",user:{username: ${username}, email: ${email}, gender: ${gender}}) {
            Message
          }
         }`,
        path,
      },
      'updateUser',
    );
  },

  delete: async (auth: AuthModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      {
        gqlQuery: `
        mutation {
          updateUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}",user:"${user}"}) {
            Message
          }
         }`,
        path,
      },
      'updateUser',
    );
  },
};

export default user;
