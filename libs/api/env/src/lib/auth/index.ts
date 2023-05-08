import { str } from 'envalid';
import { GITHUB_ENVS } from './github.env';
import { JWT_ENVS } from './jwt.env';
export const AUTH_ENVS = {
  ...JWT_ENVS,
  ...GITHUB_ENVS,
  WEB_URL: str(),
};
