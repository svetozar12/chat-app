export interface IJwtEnv {
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

export interface IPortsEnv {
  PORT: string;
  WS_PORT: string;
}

export interface IExternalUrlsEnv {
  CLIENT_URL: string;
  AVATAR_URL: string;
}

export interface IDbsConfigEnv {
  DB_NAME: string;
  BLOB_CONNECTION_STRING: string;
}
