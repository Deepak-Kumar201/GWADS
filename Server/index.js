const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

const uri = "mongodb+srv://openforce:Openforce123@cluster0.enooy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,()=>{
    console.log("Connected");
})

app.use(cors());
app.use(express.json());

app.use("/api/user",require("./routes/User"))
app.use("/api/image",require("./routes/Images"))


app.listen(port, ()=>{
    console.log("Listening to port "+port);
})