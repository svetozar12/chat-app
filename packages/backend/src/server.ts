import * as express from "express";
import * as cors from "cors";
import "dotenv/config";
import connectDb from "./connection/dbConnection";
import data from "./router/router";
require("./connection/wsConnection");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
connectDb();
app.use("/", data);

const port = process.env.PORT || 4002;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, (): void => {
    console.log(`listening on http://localhost:${port}`);
  });
}

export { app };
