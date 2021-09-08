"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var socketIo = require("./connection/wsConnection");
var User = require("./models/User.model");
var connectDb = require("./connection/dbConnection");
var data = require("./router/router");
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
