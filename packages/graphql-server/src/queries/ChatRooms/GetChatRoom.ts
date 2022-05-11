import { SignleRoom } from "../../types/ChatRoom.Schema";
import axios from "axios";
import buildUrl from "../../utils/buildUrl";
import { GraphQLString } from "graphql";
import { AxiosError } from "axios";
interface IGetChatRoom {
  id: string;
}

const GetChatRoom = {
  type: SignleRoom,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IGetChatRoom, context: undefined) {
    try {
      const url = buildUrl("chat-room", undefined, args.id);
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      const body = await response.data;
      console.log(body);

      const status = response.status;
      console.log(response, "hi");

      if (status !== 200) throw Error(body);

      return body.Message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ ErrorMsg: string }>;
        throw Error(err.response?.data.ErrorMsg);
      }
      return error;
    }
  },
};

export default GetChatRoom;
