const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String },
    category: { type: String },
    difficulty: { type: String },
    queNum: { type: Number },
    score: { type: Number }
});

const userModel = model("quizUser", userSchema);

module.exports = userModel;
