import * as mongoose from "mongoose";
const User = require("../models/User.model");
const Message = require("../models/messages.model");

const connection = "mongodb://localhost:27017/chatDB";

const connectDb = () => {
  return mongoose.connect(connection);
};
module.exports = connectDb;
