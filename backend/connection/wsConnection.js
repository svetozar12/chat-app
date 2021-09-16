"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
var users = [];
io.on("connection", function (socket) {
    socket.on("sender_reciever", function (data) {
        console.log(data);
    });
    // emiting and getting messages
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message, id = _a.id;
        io.emit("message", {
            id: id,
            name: name,
            message: message,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
        console.log("id", id);
    });
});
module.exports = io;
