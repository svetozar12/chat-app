import { str } from 'envalid';
import { GITHUB_ENVS } from './github.env';
import { JWT_ENVS } from './jwt.env';
import { GOOGLE_ENVS } from './google.env';
export const AUTH_ENVS = {
  ...JWT_ENVS,
  ...GITHUB_ENVS,
  ...GOOGLE_ENVS,
  WEB_URL: str(),
};
