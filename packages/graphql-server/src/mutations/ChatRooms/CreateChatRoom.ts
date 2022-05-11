import { SignleRoom } from "../../types/ChatRoom.Schema";
import fetch from "node-fetch";
import buildUrl from "../../utils/buildUrl";
import { GraphQLString } from "graphql";

interface ICreateChatRoom {
  id: string;
}

const CreateChatRoom = {
  type: SignleRoom,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: ICreateChatRoom, context: undefined) {
    const response = await fetch(buildUrl("chat-room", undefined, args.id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.json();
    const status = response.status;
    if (status !== 200) throw Error(body.ErrorMsg);

    return body.Message;
  },
};

export default CreateChatRoom;
