import * as mongoose from "mongoose";

interface InviteSchema {
  inviter: string;
  reciever: string;
  status: any;
}

const InviteSchema = new mongoose.Schema<InviteSchema>({
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

const Invites = mongoose.model<InviteSchema>("Invites", InviteSchema);
export default Invites;
