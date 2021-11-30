import { Schema, model } from "mongoose";

interface UserSchema {
  username: string;
}

const UserSchema = new Schema<UserSchema>({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
});

const User = model<UserSchema>("User", UserSchema);
export default User;
