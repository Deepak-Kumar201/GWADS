const mongoose = require("mongoose");
const User = {
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type:String,
        required:true
    },
    authimages : {
        type : mongoose.Schema.Types.Array,
        required : true
    }
}
module.exports = mongoose.model("User", User);
