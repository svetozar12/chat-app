import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import root from "./index";
import Schema from "./schemas";
// Construct a schema, using GraphQL schema language
import handleError from "./middleware/handleError";

console.log(root);

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    rootValue: root,
    customFormatErrorFn: (err) => {
      console.log(err.message);
      const errObj = {
        message: err.message,
      };
      return errObj;
    },
  }),
);

app.use(handleError);

app.listen(4001);
console.log("Running a GraphQL API server at http://localhost:4001/graphql");
