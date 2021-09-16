import * as mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
