"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    reciever: {
        type: String,
        required: true,
    },
    // message: {
    //   type: String,
    //   required: true,
    // },
});
var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
