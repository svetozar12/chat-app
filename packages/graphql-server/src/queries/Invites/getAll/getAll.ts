import { GraphQLString } from "graphql";
import InviteSchema from "./getAllSchema";
import resource from "../../../api_helper/index";

interface IGetAll {
  id: string;
  token: string;
  status?: string;
}

const byReciever = {
  type: InviteSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IGetAll, context: undefined) {
    const res = await resource.invite.getAllByReciever(args.id, args.token);
    return res.data;
  },
};

const byInviter = {
  type: InviteSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IGetAll, context: undefined) {
    const res = await resource.invite.getAllByInviter(args.id, args.token);
    return res.data;
  },
};

const getInvites = { byReciever, byInviter };

export default getInvites;
