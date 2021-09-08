"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
