"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var User = require("../models/User.model");
<<<<<<< HEAD
var Message = require("../models/messages.model");
=======
var ChatRoom = require("../models/chatRoom.model");
>>>>>>> invites-ws-fix
var Invite = require("../models/Invites.model");
var connection = "mongodb://localhost:27017/chatDB";
var connectDb = function () {
    return mongoose.connect(connection);
};
module.exports = connectDb;
