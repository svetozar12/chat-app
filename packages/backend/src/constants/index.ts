import "dotenv/config";

export const constants = {
  DB_NAME: process.env.DB_NAME,
  ACCESS_TOKEN: process.env.JWT_SECRET,
  REFRESH_TOKEN: process.env.JWT_REFRESH_SECRET,
};
