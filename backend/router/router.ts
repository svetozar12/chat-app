const express = require("express");
const route = express.Router();
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
    console.log(users);
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
    if (req.params.username === "") throw Error;
    if (users.username !== req.params.username) throw Error;
    res.send(users);
  } catch (error) {
    res.status(501);
    res.json({ message: error });
  }
});

// create new users

route.post("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        throw Error;
      }
    }
    const user = new User({ type: "POST", username: req.body.username });
    if (req.body.username === "") throw Error;
    await user.save();
    res.json(user);
    res.status(201).send(); //ok response and creating
  } catch (error) {
    res.status(501); //implementation error
    res.json({ message: error });
  }
});

// delete users
// ...
