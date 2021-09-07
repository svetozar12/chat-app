const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

const chat = mongoose.model("chat", ChatSchema);

module.exports = { chat };
