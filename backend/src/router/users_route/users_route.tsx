const express = require("express");
const route = express.Router();
const { registerValidation } = require("../../helpers/schema");

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({
      username: req.params.username,
    }).exec();
    if (!users || undefined)
      return res.status(404).json({
        ERROR: "Invalid input",
        message: `User ${req.params.username} doesn't exist`,
      });
    return res.status(200).json({ message: users });
  } catch (error: any) {
    return res.status(501).json({
      Error: "Internal server error",
      Message: "Something went wrong",
    });
  }
});

route.post("/users/register", async (req: Request, res: Response) => {
  try {
    const { error } = registerValidation(req.body);
    const username = req.body.username;
    if (error) {
      return res.status(409).json({ message: error.message });
    }

    const users = await User.findOne({ username }).exec();
    if (users) return res.status(409).json({ message: "user already exist" });

    const user = new User({ type: "POST", username: req.body.username });

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
      Message: "Something went wrong while deleting",
    });
  }
});

module.exports = route;
