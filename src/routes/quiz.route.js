const express = require("express");
const quizRoute = express.Router();
const quizModel = require("../model/quiz.model");

quizRoute.get("/", async (req, res) => {
    try {
        let quiz = await quizModel.find();
        return res
            .status(200)
            .send({ length: quiz.length, message: "All Question", data: quiz });
    } catch (e) {
        return res.status(401).send({ length: 0, message: e.message, data: [] });
    }
});

quizRoute.get("/filter", async (req, res) => {
    // const { category, difficulty, queNum } = req.body;
    let { category, difficulty, queNum, page } = req.query

    let limitQuestion = 5;
    let level = "easy";
    if (!queNum) {
        queNum = 5;
    }
    if (!difficulty) {
        difficulty = "easy";
    }
    if (!page) {
        page = 1;
    }
    try {
        if (category) {
            let quiz = await quizModel.find({ category, difficulty: level }).limit(queNum);
            return res
                .status(200)
                .send({ length: quiz.length, message: `Question with Category: ${category}`, data: quiz });
        } else {
            let quiz = await quizModel.find({}).limit(limitQuestion);
            return res
                .status(200)
                .send({ length: quiz.length, message: `Question with Category: ${category}`, data: quiz });
        }
    } catch (e) {
        return res.status(401).send({ length: 0, message: e.message, data: [] });
    }
});

module.exports = quizRoute;
