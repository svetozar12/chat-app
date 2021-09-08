"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
