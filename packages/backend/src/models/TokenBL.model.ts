import { Schema, model } from "mongoose";

export interface ITokenBL {
  token: string;
}

const TokenBLSchema = new Schema<ITokenBL>({
  token: { type: String, required: true },
});

const TokenBL = model<ITokenBL>("tokens", TokenBLSchema);
export default TokenBL;
