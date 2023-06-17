import { MessageApi, UserApi, Configuration, AuthApi } from '@chat-app/api/sdk';
import { getEnv } from './env';

const config = new Configuration({
  basePath: getEnv('NEXT_PUBLIC_API_URL'),
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
