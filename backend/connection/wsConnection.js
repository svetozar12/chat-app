"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    socket.on("message", function (message) {
        io.emit("message", message);
        console.log(message);
    });
});
module.exports = io;
