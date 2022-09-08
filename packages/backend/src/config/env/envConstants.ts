import { getEnv } from './envUtils';
import { IDbsConfigEnv, IExternalUrlsEnv, IJwtEnv, IPortsEnv } from './interfaces';

const jwtEnv: IJwtEnv = {
  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
};

const portsEnv: IPortsEnv = {
  PORT: getEnv('PORT'),
  WS_PORT: getEnv('WS_PORT'),
};

const externalUrlsEnv: IExternalUrlsEnv = {
  CLIENT_URL: getEnv('CLIENT_URL'),
  AVATAR_URL: getEnv('AVATAR_URL'),
};

const dbsConfigEnv: IDbsConfigEnv = {
  DB_NAME: getEnv('DB_NAME'),
  BLOB_CONNECTION_STRING: getEnv('BLOB_CONNECTION_STRING'),
};

export { jwtEnv, portsEnv, externalUrlsEnv, dbsConfigEnv };
