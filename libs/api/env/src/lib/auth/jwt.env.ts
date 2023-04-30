import { str } from 'envalid';

export const JWT_ENVS = {
  JWT_SECRET: str(),
};
