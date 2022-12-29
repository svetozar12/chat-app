import { AuthBase } from '../../../constants';
import { CHAT } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type IGetAll = AuthBase;

const getAllChats = async (_: unknown, args: IGetAll) => {
  const res = await sdk.chat.getChats(args.auth);
  return { __typename: CHAT, ...res };
};

export default getAllChats;
