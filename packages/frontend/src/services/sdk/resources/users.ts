import { AuthModel, GetUser, Message, UpdateUserModel, UserModel } from '@chat-app/gql-server';
import makeRequest from 'utils/makeRequest';
import { client } from '../index';

const path = '';

export interface IUser {
  username: string;
  email: string;
  gender: 'male' | 'female';
}

const user = {
  getById: async (auth: AuthModel): Promise<GetUser> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        query {
          getUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}") {
            _id
            username
            email
            userAvatar
          }
         }`,
      path,
    });
  },

  create: async (user: UserModel): Promise<Message> => {
    return makeRequest({
      gqlQuery: `
        mutation {
          createUser(user:"${user}") {
            Message
          }
         }`,
      path,
    });
  },

  update: async (auth: AuthModel, user: UpdateUserModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        mutation {
          updateUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}",user:"${user}") {
            Message
          }
         }`,
      path,
    });
  },

  delete: async (auth: AuthModel): Promise<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest({
      gqlQuery: `
        mutation {
          updateUser(auth:{userId: "${userId}", AccessToken: "${AccessToken}",user:"${user}") {
            Message
          }
         }`,
      path,
    });
  },
};

export default user;
