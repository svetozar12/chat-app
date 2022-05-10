import { GraphQLString } from "graphql";
import { AuthSchemaUser } from "../../types/Auth.Schema";
import fetch from "node-fetch";
import { generic } from "../../constants";
import buildUrl from "../../utils/buildUrl";

interface IAuthUser {
  token: string;
}

const AuthUser = {
  type: AuthSchemaUser,
  args: {
    token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IAuthUser, context: undefined) {
    const response = await fetch(buildUrl("auth/user"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${args.token}` },
    });

    const body = await response.json();
    const status = response.status;

    if (status !== 200) throw Error(body.ErrorMsg.message);

    return body.authData;
  },
};

export default AuthUser;
