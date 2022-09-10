import mongoose from 'mongoose';
import { dbsConfigEnv } from '../env';

const mongo_connection = async () => {
  console.log(dbsConfigEnv.MONGO_URL);

  await mongoose.connect(dbsConfigEnv.MONGO_URL, {
    autoIndex: true,
  });
  console.log('Mongo:✅');
};

export default mongo_connection;
