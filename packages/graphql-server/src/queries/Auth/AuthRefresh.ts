import { GraphQLString } from "graphql";
import { AuthSchemaRefresh } from "../../types/Auth.Schema";
import fetch from "node-fetch";
import buildUrl from "../../utils/buildUrl";

interface IAuthRefresh {
  refresh_token: string;
}

const AuthRefresh = {
  type: AuthSchemaRefresh,
  args: {
    refresh_token: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IAuthRefresh, context: undefined) {
    const response = await fetch(buildUrl("auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: args.refresh_token }),
    });

    const body = await response.json();
    const status = response.status;

    if (status !== 201) throw Error(body.ErrorMsg);

    return body;
  },
};

export default AuthRefresh;
