import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
