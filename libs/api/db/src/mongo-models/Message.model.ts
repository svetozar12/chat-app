import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InviteDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ ref: 'User', required: true })
  user_id: Types.ObjectId;
  @Prop({ ref: 'Chat', required: true })
  chat_id: Types.ObjectId;
  @Prop({ required: true })
  sender: string;
  @Prop({ required: true, min: 1, max: 100 })
  message: string;
  @Prop({ default: [] })
  seenBy: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
