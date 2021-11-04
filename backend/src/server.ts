import * as express from "express";
import * as cors from "cors";
const app = express();
const socketIo = require("./connection/wsConnection");
import connectDb from "./connection/dbConnection";
import data from "./router/router";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
app.use("/", data);

const port: number = 4001;
app.listen(port, function (): void {
  console.log(`listening on port ${port}`);
});
