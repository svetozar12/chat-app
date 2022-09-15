import { AuthBase } from '../../constants';
import sdk from '../../utils/sdk';

export interface IGetAll extends AuthBase {}

const getAllChats = async (args: IGetAll) => {
  try {
    const res = await sdk.chat.getChats(args.auth);
    return res;
  } catch (error) {
    return error;
  }
};

export default getAllChats;
