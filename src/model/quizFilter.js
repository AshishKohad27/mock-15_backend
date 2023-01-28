const { Schema, model } = require("mongoose");

const quizFilterSchema = new Schema({
    "category": String,
    "type": String,
    "difficulty": String,
    "question": String,
    "correct_answer": String,
    "incorrect_answers": { type: Array },
});

const quizFilterModel = model("quizFilter", quizFilterSchema);

module.exports = quizFilterModel;
