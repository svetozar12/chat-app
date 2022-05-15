import * as mongoose from "mongoose";
/* Change connection string to "mongodb://mongo:27017/chatAppDb" if you are building docker file and to
"mongodb://localhost:27017/chatAppDb" if you are just running yarn dev*/
import { constants } from "../constants";
const connection = `mongodb://localhost:27017/${constants.DB_NAME}`;
// const connection = `mongodb://mongo:27017/${process.env.DB_NAME}`;
import User from "../models/User.model";

const mongo_connection = () => {
  return mongoose.connect(
    connection,
    {
      autoIndex: true,
    },
    async () => {
      console.log("Connection with mongo");
      if ((await User.countDocuments().exec()) > 0) return;
      await User.create({ username: "initUser", password: "initPassword", email: "init@.com", gender: "Male", userAvatar: "" });
    },
  );
};
export default mongo_connection;
