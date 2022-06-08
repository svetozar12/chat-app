import { GraphQLString } from "graphql";
import getAllSchema from "./getAllSchema";
import resource from "../../../api_helper/index";

interface IGetAll {
  id: string;
  token: string;
}

const getAllChats = {
  type: getAllSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IGetAll, context: undefined) {
    const res = await resource.chats.getAll(args.id, args.token);
    return res.data;
  },
};

export default getAllChats;
