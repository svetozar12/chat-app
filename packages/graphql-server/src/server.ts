import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "./index";
// Construct a schema, using GraphQL schema language
import handleError from "./middleware/handleError";
import api from "./utils/axiosInstance";

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
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