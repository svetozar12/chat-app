var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
});
var user = mongoose.model("user", UserSchema);
module.exports = { user: user };
