import { GraphQLString } from "graphql";
import refreshTokenSchema from "./refreshToken.schema";
import resource from "../../../api_helper/index";

interface IRefreshToken {
  id: string;
  token: string;
}

const refreshToken = {
  type: refreshTokenSchema,
  args: {
    id: { type: GraphQLString },
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IRefreshToken) {
    const res = await resource.auth.refresh(args.id, args.token);

    return res.data;
  },
};

export default refreshToken;
