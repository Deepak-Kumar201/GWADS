const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Image = require("../models/Image");
const auth = require("../middleware/auth");

const JWTSECRET = "Deepak Kumar is my name";

router.post("/exists", async (req, resp) => {
    try {
        var oldUser = await User.findOne({ username: req.body.username });
        if (oldUser) {
            resp.status(400).send({ error: "User already exists" });
            return;
        }
        resp.status(200).send({ success: "You can continue" });
    } catch (error) {
        resp.status(500).send({ error: "Please try again later!" });
    }
});

router.post("/createuser", async (req, resp) => {
    try {
        var oldUser = await User.findOne({ username: req.body.username });
        if (oldUser) {
            resp.status(400).send({ error: "User already exists" });
            return;
        }

        var imagesURL = req.body.imagesURL;
        var selectedImages = await Image.find({ URL: { $in: imagesURL } });
        if (selectedImages.length != imagesURL.length) {
            resp.status(400).send({ error: "Image not uploaded" });
            return;
        }
        var imagesID = selectedImages.map((elem) => {
            return elem.id;
        });
        imagesID.sort();

        var newUser = new User({
            username: req.body.username,
            authimages: imagesID,
            name : req.body.name
        });

        await newUser.save();

        const data = {
            username: req.body.username,
        };

        const tokken = jwt.sign(data, JWTSECRET);

        resp.status(200).send({
            success: "Signup successfull",
            jwttokken: tokken,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({ error: "Please try again later!" });
    }
});

router.post("/login", async (req, resp) => {
    try {
        var userData = await User.findOne({ username: req.body.username });

        if (!userData) {
            resp.status(400).send("Invaild username please try again");
            return;
        }
        var imagesURL = req.body.imagesURL;
        var selectedImages = await Image.find({ URL: { $in: imagesURL } });
        var imagesID = selectedImages.map((elem) => {
            return elem.id;
        });
        imagesID.sort();
        var equal = true;

        for (var i = 0; i < userData.authimages.length; i++) {
            if (imagesID[i] != userData.authimages[i]) {
                equal = false;
            }
        }

        if (equal) {
            const data = {
                username: req.body.username,
            };

            const tokken = jwt.sign(data, JWTSECRET);

            resp.status(200).send({
                success: "Signup successfull",
                jwttokken: tokken,
            });
            return;
        } else {
            resp.status(400).send({ error: "Invaild choosen images" });
            return;
        }
    } catch (error) {
        console.log(error);
        resp.status(500).send({ error: "Please try again later!" });
    }
});

router.use(auth);

router.post("/auth", async (req, resp) => {
    try {
        if (!req.body.username) {
            resp.status(400).send({ error: "Inavlid session" });
            return;
        } else {
            const data = await User.findOne({ username: req.body.username });
            resp.status(200).send({ status: "auth success", user: data });
        }
    } catch (error) {
        resp.status(500).send({ error: "Please try again later!" });
    }
});

module.exports = router;
