import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "../Schemas/index";
const route = express.Router();
import "dotenv/config";
import { auth } from "./auth";

route.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: Schema,
      graphiql: true,
    };
  }),
);

route.use("/auth", auth);

export default route;
