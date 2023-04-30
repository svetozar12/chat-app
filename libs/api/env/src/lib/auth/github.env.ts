import { str } from 'envalid';

export const GITHUB_ENVS = {
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),
  GITHUB_CALLBACK_URL: str(),
};
