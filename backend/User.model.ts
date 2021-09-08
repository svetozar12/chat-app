const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", UserSchema);
module.exports = user;
