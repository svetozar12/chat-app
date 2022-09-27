import { Schema, model } from 'mongoose';

export enum InviteStatus {
  ACCEPTED = 'accepted',
  RECIEVED = 'recieved',
  DECLINED = 'declined',
}

export interface InviteSchema {
  user_id: [Schema.Types.ObjectId];
  inviter: InviteStatus;
  reciever: string;
  status: string;
}

const InviteSchema = new Schema<InviteSchema>({
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
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
    enum: InviteStatus,
    default: 'recieved',
    required: true,
  },
});

const Invites = model<InviteSchema>('Invites', InviteSchema);
export default Invites;
