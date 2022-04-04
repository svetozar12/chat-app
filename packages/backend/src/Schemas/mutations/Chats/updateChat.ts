import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import Chats from "../../../models/chatRoom.model";
import * as createError from "http-errors";
import { ChatSchema } from "../../types/Chat.Schema";

const updateChat = {
  type: ChatSchema,
  args: {
    chat_id: { type: GraphQLID },
    username: { type: GraphQLString },
    usernames: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(parent: any, args: { chat_id: string; username: string; usernames: string[] }) {
    const chat_id = args.chat_id;
    const deleted_user = args.username;
    const added_user = args.usernames;

    const users_rooms = await Chats.findOne({ _id: chat_id }).exec();
    const users_array = users_rooms!.members;
    let updated;

    if (!users_rooms) return createError(404, `Chat room with id: ${chat_id} not found`);
    let updated_array: string[] = [];
    if (deleted_user) {
      updated_array = users_array.filter((item) => item !== deleted_user);
      if (updated_array.length === 2) {
        await Chats.deleteOne({ _id: chat_id }).exec();
        return createError(200, `deleted chat room`);
      }
    }
    if (deleted_user) {
      updated = await Chats.findByIdAndUpdate(
        { _id: chat_id },
        {
          members: updated_array,
        },
      );
    }
    if (added_user.length > 0) {
      updated = await Chats.findByIdAndUpdate(
        { _id: chat_id },
        {
          $push: { members: added_user },
        },
      );
    }
    return updated;
  },
};

export default updateChat;

// controller logic for readBy
// const id = req.params.id;
// const readBy = req.body.read_by;
// const chat = await Chats.findOne({ _id: id });

// if (!chat) {
//   return res.status(404).json({ Message: "error 404 not found" });
// }
// if (readBy == null) return;
// chat.messages.forEach((element) => {
//   const found = element.seenBy.find((element) => element === readBy);
//   if (found) return res.status(409).json({ Message: `User ${readBy} already saw the message` });

//   element.seenBy.push(readBy);
// });
// await chat.save();
// return res.status(201).json({ Message: `User ${readBy} saw the message`, chat });
