import { InviteSchema, statusSchema } from "../../types/Invite.Schema";
import { GraphQLString } from "graphql";
import * as createError from "http-errors";
import Invites from "../../../models/Invites.model";

const createInvite = {
  type: InviteSchema,
  args: {
    _id: { type: GraphQLString },
    inviter: { type: GraphQLString },
    reciever: { type: GraphQLString },
    status: {
      type: statusSchema,
    },
  },
  async resolve(parent: any, args: { _id: string; inviter: string; reciever: string; status: string }) {
    const id = args._id;
    const status = args.status;
    const inviteInstance = await Invites.findOne({
      _id: id,
    }).exec();

    if (!inviteInstance || !status) {
      return createError(404, "Invites not found");
    }

    const updateStatus = await Invites.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    ).exec();

    return updateStatus;
  },
};

export default createInvite;
