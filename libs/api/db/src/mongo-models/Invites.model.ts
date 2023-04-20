import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;

enum InviteStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

@Schema()
export class Invite {
  @Prop({ ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  inviter: string;
  @Prop({ required: true })
  reciever: string;
  @Prop({ required: true })
  status: InviteStatus;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
