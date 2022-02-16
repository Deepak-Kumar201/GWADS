const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.post("/upload", async (req, resp) => {
    try {
        var data = {
            URL : req.body.URL
        }
        var img = new Image(data);
        await img.save();
        resp.send({"Success":"Images Uploaded"})
    } catch (error) {
        resp.status(500).send({ error: "Please try again later!" });
    }
});

module.exports = router