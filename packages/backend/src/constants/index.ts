import "dotenv/config";

export const constants = {
  ACCESS_TOKEN: process.env.JWT_SECRET as string,
  REFRESH_TOKEN: process.env.JWT_REFRESH_SECRET as string,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: `mongodb://${process.env.NODE_ENV === "production" ? "mongodb" : "localhost"}:27017/${process.env.DB_NAME}`,
  REDIS_URL: `redis://${process.env.NODE_ENV === "production" ? "redis" : "localhost"}:6379`,
};
