var mongoose = require("mongoose");
var ChatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
});
var chat = mongoose.model("chat", ChatSchema);
module.exports = { chat: chat };
