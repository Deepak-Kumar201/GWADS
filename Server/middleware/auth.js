const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWTSECRET = "Deepak Kumar is my name";

router.use((req,res,next)=>{
    try{
        let decoded = jwt.verify(req.body.token,JWTSECRET);
        req.body.username = decoded.username;
        next();
    }catch(error){
        res.status(500).json({"error":error});
    }
})
module.exports = router;