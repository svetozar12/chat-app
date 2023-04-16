import { cleanEnv } from 'envalid';
import { SERVER_ENVS } from './server.env';
import { DB_ENVS } from './db.env';

export const API_ENVS = cleanEnv(process.env, {
  ...SERVER_ENVS,
  ...DB_ENVS,
});
