const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).exec();
    if (!users || undefined)
      return res.status(404).json({ message: "No users found" });
    return res.json({ users });
  } catch (error: any) {
    return res.status(error.status).json({
      errorStatus: error.status,
      message: error,
    });
  }
});

route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({
      username: req.params.username,
    }).exec();
    if (!users || undefined)
      return res
        .status(400)
        .json({
          ERROR: "Invalid input",
          message: `User ${req.params.username} doesn't exist`,
        });
    return res.json({ message: users });
  } catch (error: any) {
    return res
      .status(error.status)
      .json({ errorStatus: error.status, message: error, stack: error.stack });
  }
});

route.post("/register", async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        res
          .status(400)
          .json({
            ERROR: "Invalid input",
            message: `User ${req.body.username} already exist`,
          });
      }
    }

    const user = new User({ type: "POST", username: req.body.username });
    if (req.body.username === "")
      return res
        .status(400)
        .json({ Error: "Invalid input", message: "Please enter valid input" });

    await user.save();
    return res
      .status(201)
      .send({ message: `User ${req.body.username} created` });
  } catch (error: any) {
    res
      .status(error.status)
      .json({ errorStatus: error.status, message: error });
  }
});

route.delete("/:username", async (req: Request, res: Response) => {
  try {
    const data = await User.deleteOne({ username: req.params.username }).exec();
    return res.status(204);
  } catch (error) {
    return res.json({ error }).sendStatus(501);
  }
});

module.exports = route;
