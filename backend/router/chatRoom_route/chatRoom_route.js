"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var route = express.Router();
var createError = require("http-errors");
var User = require("../../models/User.model");
route.get("/", function (req, res) {
    try {
        var chat = new User({ members: "user1", messages: "hi" });
        return res.send("good!");
    }
    catch (error) {
        return res.send("bad!");
    }
});
module.exports = route;
