import * as express from "express";
import * as cors from "cors";
import "dotenv/config";
import mongo_connection from "./config/mongo_config";
import redis_connection from "./config/redis_config";
import route from "./router/router";

require("./connection/wsConnection");
const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
// db connection
mongo_connection();
redis_connection();
// routes
app.use("/", route);

const port = process.env.PORT || 4002;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, (): void => {
    console.log(`listening on http://localhost:${port}`);
  });
}

export { app };
