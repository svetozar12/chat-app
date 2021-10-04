import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
