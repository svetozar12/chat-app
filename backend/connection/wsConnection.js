"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    // emiting and getting messages
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        console.log(message);
        io.emit("message", {
            name: name,
            message: message,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
    });
    // creating socket rooms
    socket.on("joinRoom", function (room) {
        socket.join(room);
        console.log("joined in room");
    });
});
module.exports = io;
