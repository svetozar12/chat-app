"use strict";
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var socketIo = require("./connection/wsConnection");
var connectDb = require("./connection/dbConnection");
var data = require("./router/router");
// midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true,
}));
connectDb();
// routes importing
app.use("/", data);
// app.use((err, req, res) => {
//   res.locals.error = err;
//   const status = err.status || 500;
//   res.status(status);
// });
var port = 4001;
app.listen(port, function () {
    console.log("listening on port " + port);
});
// http://localhost:4001/
