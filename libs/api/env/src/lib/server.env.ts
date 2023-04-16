import { str } from 'envalid';

export const SERVER_ENVS = {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
};
