import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, auto: true, _id: true })
  _id: string;
  @Prop({ type: String, required: true })
  provider: string;
  @Prop({ type: String, required: true })
  providerId: string;
  @Prop({ type: String, required: true })
  displayName: string;
  @Prop({ type: [{ value: String }], required: true })
  photos: [{ value: string }];
}

export const UserSchema = SchemaFactory.createForClass(User);
