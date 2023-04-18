import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  user_id: string;

  @Prop({ required: true, ref: 'chatRoom', type: Types.ObjectId })
  chat_id: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true, min: 1, max: 100 })
  message: string;

  @Prop({ default: [] })
  seenBy: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
