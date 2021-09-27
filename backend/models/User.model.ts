import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
