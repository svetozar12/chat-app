"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", {
            name: name,
            message: message,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
        });
    });
});
module.exports = io;
