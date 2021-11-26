import * as mongoose from "mongoose";
/* Change connection string to "mongodb://mongo:27017/chatAppDb" if you are building docker file and to
"mongodb://localhost:27017/chatAppDb" if you are just running yarn dev*/
// const connection = "mongodb://localhost:27017/chatAppDb";
const connection = "mongodb://mongo:27017/chatAppDb";

const connectDb = () => {
  return mongoose.connect(connection, {
    autoIndex: true,
  });
};
export default connectDb;
