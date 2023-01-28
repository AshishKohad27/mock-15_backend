const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, require: true },
    category: { type: String, require: true },
    difficulty: { type: String, require: true },
    queNum: { type: Number, require: true },
});

const userModel = model("user", userSchema);

module.exports = userModel;
