import { AuthBase } from "../../../constants";
import sdk from "../../../utils/sdk";
import { GraphQLYogaError } from "@graphql-yoga/node";

export interface IUser extends AuthBase {}

const getUser = async (parent: unknown, args: IUser) => {
  try {
    return await sdk.user.getUser(args.auth);
  } catch (error: any) {
    return new GraphQLYogaError(error);
  }
};

export default getUser;
