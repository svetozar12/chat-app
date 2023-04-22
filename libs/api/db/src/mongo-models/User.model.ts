import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    const salt = await genSalt();
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
Determines if a given password matches a hashed password.
@param password The password to be checked.
@param hashedPassword The hashed password to be compared against.
@returns A Promise that resolves to a boolean indicating if the password is valid. */
export async function isValidPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    return false;
  }
}
