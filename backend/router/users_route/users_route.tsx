const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const User = require("../../models/User.model");

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).exec();
    if (!users || undefined) throw createError(404, "No users found");
    res.json({ users });
  } catch (error: any) {
    res.status(error.status);
    res.json({
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
      throw createError(
        400,
        "Invalid input",
        `User ${req.params.username} doesnt exist`,
      );
    res.json({ message: users });
  } catch (error: any) {
    res.status(error.status);
    res.json({ errorStatus: error.status, message: error, stack: error.stack });
  }
});

route.post("/register", async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        throw createError(
          400,
          "Invalid input",
          `User ${req.body.username} already exist`,
        );
      }
    }

    const user = new User({ type: "POST", username: req.body.username });
    if (req.body.username === "")
      throw createError(400, "Invalid input", `Please enter valid input`);
    await user.save();
    res.status(201).send({ message: `User ${req.body.username} created` }); //ok response and creating
  } catch (error: any) {
    res.status(error.status);
    res.json({ errorStatus: error.status, message: error });
  }
});

route.delete("/:username", async (req: Request, res: Response) => {
  try {
    const data = await User.deleteOne({ username: req.params.username }).exec();
    res
      .json({
        message: `deleted user: ${req.params.username}`,
      })
      .sendStatus(204);
  } catch (error) {
    res.json({ error }).sendStatus(501);
  }
});

module.exports = route;