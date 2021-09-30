const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/", (req: Request, res: Response) => {
  try {
    const chat = new User({ members: "user1", messages: "hi" });
    return res.send("good!");
  } catch (error) {
    return res.send("bad!");
  }
});

module.exports = route;
