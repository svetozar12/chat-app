import { Schema, model } from "mongoose";

export interface ITokenSession {
  user_id: string;
  token: string;
  expireAt: any;
  expireAfter: any;
}

const TokenSessionSchema = new Schema<ITokenSession>({
  user_id: { type: String, required: true },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    required: true,
  },
  expireAfter: {
    type: Number,
    required: true,
  },
});

TokenSessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const TokenSession = model<ITokenSession>("token_session", TokenSessionSchema);
export default TokenSession;
