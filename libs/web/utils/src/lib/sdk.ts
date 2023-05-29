import { MessageApi, UserApi, Configuration, AuthApi } from '@chat-app/api/sdk';

const config = new Configuration({
  basePath: 'http://localhost:3000',
  accessToken: '',
});

export function setAccessToken(token: string) {
  config.accessToken = token;
}

export function setBasePath(basePath: string) {
  config.basePath = basePath;
}

export const sdk = {
  message: new MessageApi(config),
  user: new UserApi(config),
  auth: new AuthApi(config),
};
