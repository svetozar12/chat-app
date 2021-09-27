"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
