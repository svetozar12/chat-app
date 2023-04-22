import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type InviteDocument = HydratedDocument<Invite>;

enum InviteStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

@Schema()
export class Invite {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ required: true })
  receiverId: string;
  @Prop({ required: true })
  senderId: string;
  @Prop({ required: true })
  status: InviteStatus;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
