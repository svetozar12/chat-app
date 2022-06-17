import * as express from "express";
import * as cors from "cors";
import handleError from "./middlewares/error-handler.middleware";
// config
import config_init from "./config";
// routes function
import { routes } from "./routes";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
// ws connection
import "./connection/wsConnection";
// config_init
config_init();
// routes
routes(app);
// error handling
app.use(handleError);

export { app };
