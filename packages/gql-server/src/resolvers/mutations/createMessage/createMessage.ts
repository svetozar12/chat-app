import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";

export interface ICreateMessage extends AuthBase {
  chat_id: string;
  message: string;
}

const createMessage = async (args: ICreateMessage) => {
  try {
    const res = await sdk.message.createMessage(args.auth, args.chat_id, {
      message: args.message,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export default createMessage;