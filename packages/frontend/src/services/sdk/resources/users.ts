import {
  GetUser,
  Message,
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  QueryGetUserArgs,
} from 'services/generated/graphql';
import makeRequest from 'utils/makeRequest';

const path = '';

export interface IUser {
  username: string;
  email: string;
  gender: 'male' | 'female';
}

const user = {
  getById: async (args: QueryGetUserArgs): Promise<GetUser> => {
    const {
      auth: { userId, AccessToken },
    } = args;
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

  create: async (args: MutationCreateUserArgs): Promise<Message> => {
    const {
      user: { username, email, gender, password },
    } = args;
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

  update: async (args: MutationUpdateUserArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
      user: { email, gender, username },
    } = args;

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

  delete: async (args: MutationDeleteUserArgs): Promise<Message> => {
    const {
      auth: { userId, AccessToken },
    } = args;
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
