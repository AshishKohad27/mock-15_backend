const express = require("express");
const quizRoute = express.Router();
const quizModel = require("../model/quiz.model");
const quizFilterModel = require("../model/quizFilter");

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
    let { category, difficulty, queNum } = req.query;

    let limitQuestion = 5;
    let level = "easy";
    if (!queNum) {
        queNum = 5;
    }
    if (!difficulty) {
        difficulty = "easy";
    }

    try {
        if (category) {
            let quiz = await quizModel
                .find({ category, difficulty: level })
                .limit(queNum);
            console.log("quiz:", quiz);
            //    filter data save

            for (let i = 0; i < quiz.length; i++) {
                console.log("hello");
                let quizFilter = new quizFilterModel({
                    category: quiz[i].category,
                    difficulty: quiz[i].difficulty,
                    question: quiz[i].question,
                    correct_answer: quiz[i].correct_answer,
                    incorrect_answers: quiz[i].incorrect_answers,
                });
                await quizFilter.save();
            }

            let quizafterFilter = await quizFilterModel.find();

            return res
                .status(200)
                .send({
                    length: quizafterFilter.length,
                    message: `Question with Category: ${category}`,
                    data: quizafterFilter,
                });
        } else {
            let quiz = await quizModel.find({}).limit(limitQuestion);
            return res
                .status(200)
                .send({
                    length: quiz.length,
                    message: `Question with Category: ${category}`,
                    data: quiz,
                });
        }
    } catch (e) {
        return res.status(401).send({ length: 0, message: e.message, data: [] });
    }
});

quizRoute.delete("/delete", async (req, res) => {
    try {
        let quizFilter = await quizFilterModel.deleteMany();
        return res
            .status(200)
            .send({
                length: quizFilter.length,
                message: `Quiz get reset`,
                data: [],
            });
    } catch (e) {
        return res.status(401).send({ length: 0, message: e.message, data: [] });
    }
});

quizRoute.get("/AfterFilter", async (req, res) => {
    const { page } = req.query;
    console.log('page:', page)
    if (!page) {
        page = 1;
    }
    try {
        let quizlength = await quizFilterModel.find();
        let quizafterFilter = await quizFilterModel.find().limit(1).skip((+page - 1) * 1);
        return res
            .status(200)
            .send({
                length: quizlength.length,
                message: `Question with Category`,
                data: quizafterFilter,
            });
    } catch (e) {
        return res.status(401).send({ length: 0, message: e.message, data: [] });
    }
})
module.exports = quizRoute;
