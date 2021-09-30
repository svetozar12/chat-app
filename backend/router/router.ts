const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const userRoute = require("./users_route/users_route");
const inviteRoute = require("./invite_route/invite_route");
const Message = require("../models/messages.model");

route.use("/", userRoute);
route.use("/", inviteRoute);

module.exports = route;
