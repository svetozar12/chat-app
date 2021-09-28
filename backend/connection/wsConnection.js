"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
var me = "";
var you = "";
io.on("connection", function (socket) {
    socket.on("sender_reciever", function (_a) {
        var sender = _a.sender, reciever = _a.reciever;
        me = sender;
        you = reciever;
    });
    socket.emit("send_message", { me: me, you: you });
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", {
            name: name,
            message: message,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
    });
    socket.on("friend_request", function (_a) {
        var _id = _a._id, inviter = _a.inviter, reciever = _a.reciever, status = _a.status;
        console.log(_id);
        io.emit("friend_request", {
            _id: _id,
            inviter: inviter,
            reciever: reciever,
            status: status,
        });
    });
    socket.on("send_friend_request", function (_a) {
        var inviter = _a.inviter, reciever = _a.reciever, status = _a.status;
        console.log("status in the backend", status);
        socket.broadcast.emit("send_friend_request", {
            inviter: inviter,
            reciever: reciever,
            status: status,
        });
    });
});
module.exports = io;
