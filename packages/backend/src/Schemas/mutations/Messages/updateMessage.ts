import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import Messages from "../../../models/Message.model";
import * as createError from "http-errors";
import { MessageSchema } from "../../types/Message.Schema";
import { isAuth } from "../../permission";

const updateMessage = {
  type: new GraphQLList(MessageSchema),
  args: {
    _id: { type: GraphQLID },
    newMessage: { type: GraphQLString },
  },
  async resolve(parent: any, args: { _id: string; newMessage: string }, context: { user: string }) {
    isAuth(context.user);
    const _id = args._id;
    const newMessage: string = args.newMessage;
    if (newMessage === "" || newMessage === null) return createError(200, "Message didn't change");
    const user = Messages.findByIdAndUpdate(_id, { message: newMessage }).exec();
    if (!user) return createError(404, "Message wasn't found");
    return createError(200, "Message has been updated");
  },
};

export default updateMessage;
