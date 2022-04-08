import { UserSchema } from "../../types/User.Schema";
import User from "../../../models/User.model";
import * as createError from "http-errors";

const getUser = {
  type: UserSchema,
  async resolve(parent: any, args: null, context: any) {
    console.log(context);

    const response = await User.findOne({ username: context.user });
    if (!response) {
      return createError(404, `User ${context.user} not found`);
    }
    return response;
  },
};

export default getUser;
