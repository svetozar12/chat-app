"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var io = require("socket.io")(4000, {
    cors: {
        origin: "*"
    }
});
//============================
// start of websocket connection
//============================
io.on("connection", function (socket) {
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", { name: name, message: message });
        console.log(socket.id);
    });
});
//============================
// end of websocket connection
//============================
// const User = require("./User.model");
// const connection = "mongodb://localhost:27017/chatDB";
// console.log(User);
// const connectDB = () => {
//   return db.connect(connection);
// };
// connectDB().then(() => {
//   console.log("Mongodb connected");
// });
// app.get("/users", async (req: Request, res: Response) => {
//   const users = await User.find();
//   res.json(users);
// });
// app.get("/user-create", async (req: Request, res: Response) => {
//   const user = new User({ username: "Example" });
//   await user.save().then(() => console.log("user connected"));
//   res.send("User connected \n");
// });
var port = 4001;
app.listen(port, function () {
    console.log("listening on port " + port);
});
