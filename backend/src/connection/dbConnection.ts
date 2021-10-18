import * as mongoose from "mongoose";
// const User = require("../models/User.model");
// const ChatRoom = require("../models/chatRoom.model");
// const Invite = require("../models/Invites.model");

const connection = "mongodb://localhost:27017/chatAppDb";

const connectDb = () => {
  return mongoose.connect(connection, {
    autoIndex: true,
  });
};
export default connectDb;
