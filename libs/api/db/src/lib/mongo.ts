import mongoose from 'mongoose';

const ConnectMongo = async (MONGO_URL: string): Promise<void> => {
  await mongoose.connect(MONGO_URL, {
    autoIndex: true,
  });
  console.log('Mongo:✅');
};

export { ConnectMongo };
