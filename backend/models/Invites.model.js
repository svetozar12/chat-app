"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var InviteSchema = new mongoose.Schema({
    inviter: {
        type: String,
        required: true,
    },
    reciever: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["recieved", "accepted", "declined"],
        default: "recieved",
        required: true,
    },
});
var Invites = mongoose.model("Invites", InviteSchema);
module.exports = Invites;
