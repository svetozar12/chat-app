import * as mongoose from "mongoose";
// import mongoose = require("mongoose");
const User = require("./User.model");

const connection = "mongodb://localhost:27017/chatDB";

const connectDb = () => {
  return mongoose.connect(connection);
};
module.exports = connectDb;
