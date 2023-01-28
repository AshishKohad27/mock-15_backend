const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
    "category": String,
    "type": String,
    "difficulty": String,
    "question": String,
    "correct_answer": String,
    "incorrect_answers": { type: Array },
});

const quizModel = model("quiz", quizSchema);

module.exports = quizModel;
