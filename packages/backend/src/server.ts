import * as express from "express";
import * as cors from "cors";
import connectDb from "./connection/dbConnection";
import data from "./router/router";
const socketIo = require("./connection/wsConnection");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
app.use("/", data);

export { app };
