"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route = express.Router();
var createError = require("http-errors");
var userRoute = require("./users_route/users_route");
var inviteRoute = require("./invite_route/invite_route");
<<<<<<< HEAD
var Message = require("../models/messages.model");
route.use("/", userRoute);
route.use("/", inviteRoute);
=======
var chatRoute = require("./chatRoom_route/chatRoom_route");
route.use("/", userRoute);
route.use("/", inviteRoute);
route.use("/", chatRoute);
>>>>>>> invites-ws-fix
module.exports = route;
