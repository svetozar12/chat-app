import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
export interface UserSchema {
  username: string;
  password: string;
  email: string;
  gender: string;
  isValidPassword: any;
}

const UserSchema = new Schema<UserSchema>({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    enum: ["male", "female"],
    required: true,
  },
});

// this is middleware which is executed before mongoose method save to hash the password
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // @ts-ignore
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

//This is custom method which compares password input and hashed password
UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const User = model<UserSchema>("User", UserSchema);
export default User;
