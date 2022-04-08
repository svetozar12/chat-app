import { InviteSchema, statusSchema } from "../../types/Invite.Schema";
import { GraphQLString } from "graphql";
import * as createError from "http-errors";
import Invites from "../../../models/Invites.model";
import User from "../../../models/User.model";
import { isAuth } from "../../permission";

const createInvite = {
  type: InviteSchema,
  args: {
    inviter: { type: GraphQLString },
    reciever: { type: GraphQLString },
    status: {
      type: statusSchema,
    },
  },
  async resolve(parent: any, args: { inviter: string; reciever: string; status: string }, context: { user: string }) {
    isAuth(context.user);
    const user = await User.findOne({
      username: args.reciever,
    }).exec();

    if (!user) {
      return createError(404, "User not found");
    }

    const checkInviteInstance = await Invites.findOne({
      id: user._id,
      reciever: args.reciever,
      inviter: args.inviter,
      $or: [{ status: "recieved" }, { status: "accepted" }],
    });

    if (checkInviteInstance) return createError(409, "Already sent");

    if (args.reciever === args.inviter) return createError(409, "Can't send invites to yourself");

    const invites = await new Invites({
      reciever: args.reciever,
      inviter: args.inviter,
      status: args.status,
    });
    await invites.save();

    return invites;
  },
};

export default createInvite;
