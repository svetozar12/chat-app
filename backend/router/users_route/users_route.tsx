const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({
      username: req.params.username,
    }).exec();
    if (!users || undefined)
      return res.status(400).json({
        ERROR: "Invalid input",
        message: `User ${req.params.username} doesn't exist`,
      });
    return res.json({ message: users });
  } catch (error: any) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

route.post("/users/register", async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        return res.status(400).json({
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
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

route.delete("/users/:username", async (req: Request, res: Response) => {
  try {
    const data = await User.deleteOne({ username: req.params.username }).exec();
    return res.status(204);
  } catch (error) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

module.exports = route;
