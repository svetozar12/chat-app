const express = require("express");
const route = express.Router();
import { Request, Response } from "express";

const User = require("../models/User.model");

module.exports = route;
// get all users

route.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  const [item] = users;
  res.send(users);
});

// create new users

route.post("/user-create", async (req: Request, res: Response) => {
  const user = new User({ type: "POST", username: req.body.name });
  await user.save();
});

// delete users
// ...
