"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var chatRoomSchema = new mongoose.Schema({
    members: {
        type: [String],
        required: true,
    },
    messages: {
        type: [String],
        required: true,
    },
});
var chatRoom = mongoose.model("chatRoom", chatRoomSchema);
module.exports = chatRoom;
