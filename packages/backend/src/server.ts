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

const port: number = 4001;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
  });
}

export { app };
