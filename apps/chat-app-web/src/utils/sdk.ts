import {
  AuthApi,
  ChatsApi,
  UsersApi,
  MessagesApi,
  Configuration,
} from '@chat-app/sdk';

const config = new Configuration({
  accessToken: '',
  basePath: 'http://localhost:8080/v1',
});

export function setAccessToken(token: string) {
  config.accessToken = token;
}

export const api = {
  v1: {
    auth: () => new AuthApi(config),
    chat: () => new ChatsApi(config),
    user: () => new UsersApi(config),
    message: () => new MessagesApi(config),
  },
};
