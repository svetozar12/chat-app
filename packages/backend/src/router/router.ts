import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "../Schemas/index";
const route = express.Router();
import "dotenv/config";
import { route as users_route } from "./users_route/users_route";
import { route as invite_route } from "./invite_route/invite_route";
import { route as chat_route } from "./chatRoom_route/chatRoom_route";
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
route.use("/users", users_route);
route.use("/", invite_route);
route.use("/chat-room", chat_route);
route.use("/messages", messages);
route.use("/auth", auth);

export default route;

// route.use(
//   "/graphql",
//   graphqlHTTP({
//     users_route,
//     graphiql: true,
//   }),
// );
