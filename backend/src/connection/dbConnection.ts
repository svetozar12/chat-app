import * as mongoose from "mongoose";

const connection = "mongodb://localhost:27000/chatAppDb?replicaSet=rs";

const connectDb = () => {
  return mongoose.connect(connection, {
    autoIndex: true,
  });
};
export default connectDb;
