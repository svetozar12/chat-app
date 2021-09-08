const express = require("express");
const app = express();
const cors = require("cors");

const socketIo = require("./connection/wsConnection");
const connectDb = require("./connection/dbConnection");
const data = require("./router/router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
