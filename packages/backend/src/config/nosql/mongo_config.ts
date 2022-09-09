import mongoose from 'mongoose';
import { constants } from '../constants';

const mongo_connection = async () => {
  await mongoose.connect(constants.MONGO_URL, {
    autoIndex: true,
  });
  console.log('Mongo:✅');
};

export default mongo_connection;
