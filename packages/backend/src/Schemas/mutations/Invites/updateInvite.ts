import { InviteSchema, statusSchema } from "../../types/Invite.Schema";
import { GraphQLString } from "graphql";
import * as createError from "http-errors";
import Invites from "../../../models/Invites.model";
import { isAuth } from "../../permission";

const updateInvite = {
  type: InviteSchema,
  args: {
    _id: { type: GraphQLString },
    status: {
      type: statusSchema,
    },
  },
  async resolve(parent: any, args: { _id: string; status: string }, context: { user: string }) {
    isAuth(context.user);
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

export default updateInvite;
