import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "../Schemas/index";
const route = express.Router();
import "dotenv/config";
import { auth } from "./auth";
import { verifyToken } from "../utils/jwt_helper";

route.use(
  "/graphql",
  graphqlHTTP((req: any) => {
    return {
      schema: Schema,
      graphiql: true,
      headerEditorEnabled: true,
      context: ((): any => {
        const token = req.headers["authorization"] || "";
        const secret: string = process.env.JWT_SECRET as string;
        const user = verifyToken(token, secret);
        console.log(user);

        return { user };
      })(),
    };
  }),
);

route.use("/auth", auth);

export default route;
