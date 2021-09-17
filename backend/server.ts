const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const socketIo = require("./connection/wsConnection");
const connectDb = require("./connection/dbConnection");
const data = require("./router/router");

// midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

connectDb();

// routes importing
app.use("/", data);

app.use((err, req, res) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
});

const port: number = 4001;
app.listen(port, function (): void {
  console.log(`listening on port ${port}`);
});
// http://localhost:4001/
