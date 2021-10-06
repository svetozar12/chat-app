import * as mongoose from "mongoose";

const InviteSchema = new mongoose.Schema({
  inviter: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["recieved", "accepted", "declined"],
    default: "recieved",
    required: true,
  },
});

const Invites = mongoose.model("Invites", InviteSchema);
module.exports = Invites;
