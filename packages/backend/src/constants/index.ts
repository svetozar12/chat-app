import "dotenv/config";

interface IConstants {
  CLIENT_URL: string;
  PORT: string;
  WS_PORT: string;
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  SESSION_SECRET: string;
  NODE_ENV: string;
  MONGO_URL: string;
  REDIS_URL: string;
  BLOB_URL: string;
  AVATAR_URL: string;
}

export const constants: IConstants = {
  CLIENT_URL: process.env.CLIENT_URL as string,
  PORT: process.env.PORT as string,
  WS_PORT: process.env.WS_PORT as string,
  ACCESS_TOKEN: process.env.JWT_SECRET as string,
  REFRESH_TOKEN: process.env.JWT_REFRESH_SECRET as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_URL: `mongodb://${process.env.NODE_ENV === "production" ? "mongodb" : "localhost"}:27017/${process.env.DB_NAME}`,
  REDIS_URL: `redis://${process.env.NODE_ENV === "production" ? "redis" : "localhost"}:6379`,
  BLOB_URL: process.env.BLOB_CONNECTION_STRING as string,
  AVATAR_URL: `${process.env.AVATAR_URL}/identicon`,
};
