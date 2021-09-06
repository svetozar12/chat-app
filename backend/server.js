var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});
io.on("connection", function (socket) {
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", { name: name, message: message });
    });
});
http.listen(4000, function () {
    console.log("listening on port 4000");
});
