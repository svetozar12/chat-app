import { cleanEnv } from 'envalid';
import { SERVER_ENVS } from './server.env';
import { DB_ENVS } from './mongo.env';
import { AUTH_ENVS } from './auth';

export const API_ENVS = cleanEnv(process.env, {
  ...SERVER_ENVS,
  ...DB_ENVS,
  ...AUTH_ENVS,
});
