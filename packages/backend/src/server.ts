import * as express from "express";
import * as cors from "cors";
import handleError from "./middlewares/error-handler.middleware";
// db configs
import mongo_connection from "./config/mongo_config";
import redis_connection from "./config/redis_config";
// routes function
import { routes } from "./routes";

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
routes(app);
// error handling
app.use(handleError);

export { app };
