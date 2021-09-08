"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// import mongoose = require("mongoose");
var User = require("./User.model");
var connection = "mongodb://localhost:27017/chatDB";
var connectDb = function () {
    return mongoose.connect(connection);
};
module.exports = connectDb;
