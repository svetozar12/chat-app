import { GraphQLList, GraphQLID } from "graphql";
import Messages from "../../../models/Message.model";
import * as createError from "http-errors";
import { MessageSchema } from "../../types/Message.Schema";
import { isAuth } from "../../permission";

const deleteMessage = {
  type: new GraphQLList(MessageSchema),
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent: any, args: { _id: string }, context: { user: string }) {
    isAuth(context.user);
    const message_id = args._id;
    const isMessage = await Messages.findOne({ _id: message_id });
    if (!isMessage) return createError(404, "Message not found");
    await Messages.deleteOne({ _id: message_id }).exec();
    return createError(200, "Message has been deleted");
  },
};

export default deleteMessage;
