import * as mongoose from "mongoose";
const connection = "mongodb://mongo:27017/chatAppDb";

const connectDb = () => {
  return mongoose.connect(connection, {
    autoIndex: true,
  });
};
export default connectDb;
