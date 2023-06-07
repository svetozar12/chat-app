import { str } from 'envalid';

export const SERVER_ENVS = {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  API_PREFIX: str({ default: 'api' }),
  PORT: str({ default: '3000' }),
};
