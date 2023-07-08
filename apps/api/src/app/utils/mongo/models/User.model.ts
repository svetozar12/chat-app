import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline',
}
@Schema()
export class User {
  @Prop({ type: String, auto: true, _id: true })
  _id: string;
  @Prop({ type: String, required: true })
  provider: string;
  @Prop({ type: String, required: true })
  providerId: string;
  @Prop({ type: String, required: true, default: 'unknown' })
  displayName: string;
  @Prop({ type: [{ value: String }], required: true })
  photos: [{ value: string }];
  @Prop({ type: String, enum: [Status.ONLINE, Status.OFFLINE], required: true })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
