const express = require("express");
const route = express.Router();
import { Request, Response } from "express";

const User = require("../models/User.model");

module.exports = route;
// get all users

route.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
    res.status(200); //ok response
  } catch (error) {
    res.status(501); //implementation error
    res.json({ message: error });
  }
});

// create new users

route.post("/users", async (req: Request, res: Response) => {
  try {
    const user = new User({ type: "POST", username: req.body.username });
    if (req.body.username === "" || undefined || null) throw Error;
    if (req.body.username === User.findOne(req.body.username)) throw Error;
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
