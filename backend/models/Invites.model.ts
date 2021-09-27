import * as mongoose from "mongoose";

const InviteSchema = new mongoose.Schema({
  inviter: {
    type: String,
  },
  reciever: {
    type: String,
  },
  status: {
    type: String,
    enum: ["recieved", "accepted", "declined"],
    default: "recieved",
  },
});

const Invites = mongoose.model("Invites", InviteSchema);
module.exports = Invites;
