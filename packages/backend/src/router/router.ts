import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "../Schemas/index";
const route = express.Router();
import "dotenv/config";
import { route as messages } from "./messages_route/messages";
import { auth } from "./auth";

route.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    customFormatErrorFn: (err) => ({ message: err.message }),
    graphiql: true,
  }),
);

route.use("/messages", messages);
route.use("/auth", auth);

export default route;
