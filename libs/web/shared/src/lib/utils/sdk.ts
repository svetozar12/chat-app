import { MessageApi, UserApi, Configuration, AuthApi } from '@chat-app/api/sdk';
import { WEB_ENVS } from './env';
const { NEXT_PUBLIC_API_HOST, NEXT_PUBLIC_API_PORT, NEXT_PUBLIC_API_SCHEME } =
  WEB_ENVS;
const url = `${NEXT_PUBLIC_API_SCHEME}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`;
const config = new Configuration({
  basePath: url,
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
