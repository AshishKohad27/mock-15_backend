const express = require("express");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

userRoute.get("/", async (req, res) => {
    const user = await userModel.find();
    return res.status(200).send({ message: "Users", desc: "", data: user });
});

userRoute.post("/login", async (req, res) => {
    const { name, category, difficulty, queNum, score } = req.body;
    console.log(
        "name, category, difficulty, queNum, score:",
        name,
        category,
        difficulty,
        queNum,
        score
    );

    try {
        let user = new userModel({
            name,
            category,
            difficulty,
            queNum,
            score
        })
        await user.save();

        let userId = await userModel.find({
            name,
            category,
            difficulty,
            queNum,
            score
        })

        let token = jwt.sign(
            {
                _id: userId, name, category, difficulty, queNum, score
            },
            "SECRET_user",
            { expiresIn: "4 days" }
        );
        return res.status(200).send({
            message: "Login SuccessFully",
            desc: "",
            token,
        });
    } catch (e) {
        return res
            .status(401)
            .send({ message: "Error...", desc: e.message, user: [] });
    }
});

userRoute.patch("/updatescore", async (req, res) => {
    const { id, name, category, difficulty, queNum, score } = req.body;
    console.log(
        " id, name, category, difficulty, queNum, score:",
        id,
        name,
        category,
        difficulty,
        queNum,
        score
    );
    // console.log('userFind:', userFind);
    try {
        await userModel.findByIdAndUpdate(
            { _id: id },
            {
                name,
                category,
                difficulty,
                queNum,
                score,
            }
        );

        let user = await userModel.find({});

        return res.status(200).send({
            message: "Update SuccessFully",
            desc: "",
            user,
        });
    } catch (e) {
        return res
            .status(401)
            .send({ message: "Error...", desc: e.message, user: [] });
    }
});

userRoute.post("/verify", async (req, res) => {
    const { token } = req.body;
    if (token === undefined) {
        console.log("token from verify:", token);
        return res.send("Unauthorized");
    }
    try {
        const verification = jwt.verify(token, "SECRET_user");
        console.log("verification:", verification);
        if (verification) {
            return res.status(200).send(verification);
        }
    } catch (e) {
        console.log("e:", e.message);
        return res
            .status(403)
            .send({ message: "Invalid Token", desc: e.message, user: [] });
    }
});

module.exports = userRoute;
