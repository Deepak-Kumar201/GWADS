const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const User = require("../models/User");

router.post("/upload", async (req, resp) => {
    try {
        var data = {
            URL: req.body.URL,
        };
        var img = new Image(data);
        await img.save();
        resp.send({ Success: "Images Uploaded" });
    } catch (error) {
        resp.status(500).send({ error: "Please try again later!" });
    }
});

router.post("/generateRandom", async (req, resp) => {
    try {
        var user = await User.findOne({ username: req.body.username });
        if(!user){
            resp.status(400).send({error:"No user found"});
            return;
        }
        var data1 = await Image.find({ _id: { $in: user.authimages } });
        var data2 = await Image.find({ _id: { $nin: user.authimages } }).limit(
            10 - user.authimages.length
        );
        var data1 = data1.map((elem) => {
            return elem.URL;
        });
        var data2 = data2.map((elem) => {
            return elem.URL;
        });
        data2 = data2.concat(data1);
        resp.send({ ImageData: data2, success: "Image Fetched" });
    } catch (error) {
        resp.status(500).send({ error: "Please try again later!" });
    }
});

module.exports = router;
