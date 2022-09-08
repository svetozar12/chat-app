import resource from '../../utils/api_helper';
import { Messages, QueryGetAllMessagesArgs } from '../../generated/graphql';

export interface IMessage {
  user_id: string;
  chat_id: string;
  query: {
    page_size: number;
    page_number: number;
  };
  token: string;
}

const getAllMessages = async (args: QueryGetAllMessagesArgs): Promise<Messages[]> => {
  const res = await resource.message.getAll(args);
  if (res.ErrorMsg) throw Error(res.ErrorMsg);

  return res.data.data;
};

export default getAllMessages;
