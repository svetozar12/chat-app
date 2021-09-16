"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var User = require("../models/User.model");
var Message = require("../models/messages.model");
var connection = "mongodb://localhost:27017/chatDB";
var connectDb = function () {
    return mongoose.connect(connection);
};
module.exports = connectDb;
