import { GraphQLString, GraphQLBoolean, GraphQLList } from "graphql";
import Invites from "../../models/Invites.model";
import * as createError from "http-errors";
import { statusSchema, InviteSchema } from "../types/Invite.Schema";
const getInvite = {
  type: new GraphQLList(InviteSchema),
  args: {
    username: { type: GraphQLString },
    status: { type: statusSchema },
    byInviter: { type: GraphQLBoolean, description: "Query data by inviter invites" },
    byReciever: { type: GraphQLBoolean, description: "Query data by reciever invites" },
  },
  async resolve(parent: any, args: { username: string; status: string; byInviter: boolean; byReciever: boolean }) {
    const name = args.username;
    const status = args.status;
    const queryParam = args.byInviter ? { inviter: name } : { reciever: name };
    let invites;
    if (args.status !== undefined) {
      invites = await Invites.find({
        ...queryParam,
        status,
      });
    } else {
      invites = await Invites.find({
        ...queryParam,
      }).select("status inviter reciever");
    }

    console.log(invites);

    if (!invites || invites.length <= 0) {
      return createError(404, "You dont have  invites .");
    }

    return invites;
  },
};

export default getInvite;
