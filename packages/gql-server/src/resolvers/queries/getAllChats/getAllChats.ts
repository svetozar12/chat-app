import { AuthBase } from '../../../constants';
import { CHAT_LIST, ERROR } from '../../../constants/typenames';
import sdk from '../../../utils/sdk';

export type IGetAll = AuthBase;

const getAllChats = async (_: unknown, args: IGetAll) => {
  const res: any = await sdk.chat.getChats(args.auth);
  if (res.__typename === ERROR) return res;

  return { __typename: CHAT_LIST, res };
};

export default getAllChats;
