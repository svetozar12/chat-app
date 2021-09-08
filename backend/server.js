"use strict";
var express = require("express");
var app = express();
var cors = require("cors");
var socketIo = require("./connection/wsConnection");
var connectDb = require("./connection/dbConnection");
var data = require("./router/router");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb().then(function () {
    console.log("Mongodb connected");
});
// routes importing
app.use("/", data);
var port = 4001;
app.listen(port, function () {
    console.log("listening on port " + port);
});
// http://localhost:4001/
