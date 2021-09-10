"use strict";
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
io.on("connection", function (socket) {
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", { name: name, message: message });
        console.log(name);
    });
});
module.exports = io;
