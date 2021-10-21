import * as mongoose from "mongoose";

interface UserSchema {
  username: string;
}

const UserSchema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
});

const User = mongoose.model<UserSchema>("User", UserSchema);
export default User;
