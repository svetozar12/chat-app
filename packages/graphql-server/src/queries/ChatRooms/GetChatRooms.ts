// "/chat-room", { name: "user_name", value: args.value };
import { GraphQLString } from "graphql";
import axios, { AxiosError } from "axios";
import { ChatRooms } from "../../types/ChatRoom.Schema";
import buildUrl from "../../utils/buildUrl";

interface IGetChatRooms {
  username: string;
}

const GetChatRooms = {
  type: ChatRooms,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IGetChatRooms, context: undefined) {
    try {
      const url = buildUrl("chat-room", [{ name: "user_name", value: args.username }]);
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      const body = await response.data;

      return body;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ ErrorMsg: string }>;
        throw Error(err.response?.data.ErrorMsg);
      }
    }
  },
};

export default GetChatRooms;
