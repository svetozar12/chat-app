"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var InviteSchema = new mongoose.Schema({
    inviter: {
        type: String,
<<<<<<< HEAD
    },
    reciever: {
        type: String,
=======
        required: true,
    },
    reciever: {
        type: String,
        required: true,
>>>>>>> invites-ws-fix
    },
    status: {
        type: String,
        enum: ["recieved", "accepted", "declined"],
        default: "recieved",
<<<<<<< HEAD
=======
        required: true,
>>>>>>> invites-ws-fix
    },
});
var Invites = mongoose.model("Invites", InviteSchema);
module.exports = Invites;
