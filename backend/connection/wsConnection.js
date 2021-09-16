"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
var me = "";
var you = "";
var messages = [];
if (messages.length >= 11)
    messages.shift();
io.on("connection", function (socket) {
    socket.on("sender_reciever", function (_a) {
        var sender = _a.sender, reciever = _a.reciever;
        me = sender;
        you = reciever;
        // console.log(reciever);
    });
    socket.emit("send_message", { me: me, you: you });
    // emiting and getting messages
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message, id = _a.id;
        io.emit("message", {
            id: id,
            name: name,
            message: message,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
    });
});
module.exports = io;
