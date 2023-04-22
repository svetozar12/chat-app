import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true, _id: true })
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ required: true })
  userId: string;
  @Prop({ ref: 'Chat', required: true })
  chatId: Types.ObjectId;
  @Prop({ required: true })
  sender: string;
  @Prop({ required: true, min: 1, max: 100 })
  message: string;
  @Prop({ default: [] })
  seenBy: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
