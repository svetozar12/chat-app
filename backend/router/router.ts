const express = require("express");
const route = express.Router();
const createError = require("http-errors");
import { Request, Response } from "express";

const User = require("../models/User.model");

module.exports = route;

// get
route.get("/", (req: Request, res: Response) => {
  res.send("Welcome Home");
});

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    res.send(users);
    res.status(200); //ok response
  } catch (error) {
    res.status(501); //implementation error
    res.json({ message: error });
  }
});
// login auth
route.get("/users/:username", async (req: Request, res: Response) => {
  try {
    const users = await User.findOne({ username: req.params.username }).exec();
    if (
      req.params.username === "" ||
      typeof Number ||
      users.username !== req.params.username
    )
      throw createError(
        400,
        "Invalid input",
        `User ${req.params.username} doesn't exist`,
      );
    res.send(users);
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
    if (req.body.username === "" || req.body.username === typeof Number)
      throw createError(
        400,
        "Invalid input",
        `User ${req.params.username} doesn't exist`,
      );
    await user.save();
    res.status(201).send(); //ok response and creating
  } catch (error: any) {
    res.status(error.status);
    res.json({ errorStatus: error.status, message: error, stack: error.stack });
  }
});

// delete users
// ...
