const express = require("express");
const route = express.Router();
const createError = require("http-errors");

import { Request, Response } from "express";

const User = require("../models/User.model");

module.exports = route;

// login auth
route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({ username: req.params.username }).exec();
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

// create new users

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

// delete users
// ...
