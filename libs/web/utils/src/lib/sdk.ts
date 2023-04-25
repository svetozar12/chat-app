import { ChatApi, MessageApi, Configuration } from '@chat-app/api/sdk';

const config = new Configuration({
  basePath: 'http://localhost:3000',
  apiKey: 'secret',
});

export const sdk = {
  chat: new ChatApi(config),
  message: new MessageApi(config),
};
