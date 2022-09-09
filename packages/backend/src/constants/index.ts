import 'dotenv/config';

interface IConstants {
  MONGO_URL: string;
  REDIS_URL: string;
  AVATAR_URL: string;
}

export const constants: IConstants = {
  MONGO_URL: `mongodb://${process.env.NODE_ENV === 'production' ? 'mongodb' : 'localhost'}:27017/${process.env.DB_NAME}`,
  REDIS_URL: `redis://${process.env.NODE_ENV === 'production' ? 'redis' : 'localhost'}:6379`,
  AVATAR_URL: `${process.env.AVATAR_URL}/identicon`,
};
