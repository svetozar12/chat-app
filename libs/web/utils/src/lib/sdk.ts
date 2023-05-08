import { ChatApi, MessageApi, UserApi, Configuration } from '@chat-app/api/sdk';

export const config = new Configuration({
  basePath: 'http://localhost:3000',
  accessToken: '',
});

export const sdk = {
  chat: new ChatApi(config),
  message: new MessageApi(config),
  user: new UserApi(config),
};
