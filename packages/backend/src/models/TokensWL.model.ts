import { Schema, model } from "mongoose";

export interface ITokenWL {
  access_token: string;
  refresh_token: string;
}

const TokenWLSchema = new Schema<ITokenWL>({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
});

const TokenWL = model<ITokenWL>("TokenWL", TokenWLSchema);
export default TokenWL;
