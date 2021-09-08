const express = require("express");
const app = express();

const socketIo = require("./connection/wsConnection");
const User = require("./models/User.model");
const connectDb = require("./connection/dbConnection");
import data = require("./router/router");

connectDb().then((): void => {
  console.log("Mongodb connected");
});
// routes importing
app.use("/", data);

const port: number = 4001;
app.listen(port, function (): void {
  console.log(`listening on port ${port}`);
});
// http://localhost:4001/
