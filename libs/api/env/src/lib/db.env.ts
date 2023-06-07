import { str } from 'envalid';

export const DB_ENVS = {
  MONGO_URL: str(),
};
