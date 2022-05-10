// "/chat-room", { name: "user_name", value: args.value };
import { GraphQLString } from "graphql";
import fetch from "node-fetch";
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
    const url = buildUrl("chat-room", [{ name: "user_name", value: args.username }]);
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.json();
    return body;
  },
};

export default GetChatRooms;
