const mongoose = require("mongoose");
const Image = {
    URL : {
        type : String,
        required : true,
        unique : true
    }
}
module.exports = mongoose.model("Image", Image);
