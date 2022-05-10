import { GraphQLString } from "graphql";
import { AuthSchema } from "../../types/Auth.Schema";
import fetch from "node-fetch";
import buildUrl from "../../utils/buildUrl";

interface IAuthLogin {
  username: string;
  password: string;
}

const AuthLogin = {
  type: AuthSchema,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: undefined, args: IAuthLogin, context: undefined) {
    const response = await fetch(buildUrl("auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: args.username, password: args.password }),
    });

    const body = await response.json();
    const status = response.status;

    if (status !== 201) throw Error(body.ErrorMsg);

    return body;
  },
};

export default AuthLogin;
