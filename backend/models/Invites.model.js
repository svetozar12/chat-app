"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var InviteSchema = new mongoose.Schema({
    inviter: {
        type: String,
    },
    reciever: {
        type: String,
    },
    status: {
        type: String,
        enum: ["recieved", "accepted", "declined"],
        default: "recieved",
    },
});
var Invites = mongoose.model("Invites", InviteSchema);
module.exports = Invites;
