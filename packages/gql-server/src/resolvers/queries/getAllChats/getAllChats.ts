import { AuthBase } from '../../../constants';
import sdk from '../../../utils/sdk';

export type IGetAll = AuthBase;

const getAllChats = async (_: unknown, args: IGetAll) => {
  const res = await sdk.chat.getChats(args.auth);
  return res;
};

export default getAllChats;
