"use strict";
var io = require("socket.io")(4000, {
    cors: {
        origin: "*",
    },
});
var Socket = /** @class */ (function () {
    function Socket() {
    }
    Socket.prototype.friend_request = function (event, data_on, body, data_emit) {
        socket.on(event, function (data_on) {
            body;
        });
        io.emit(event, data_emit);
    };
    return Socket;
}());
