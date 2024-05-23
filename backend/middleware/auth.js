
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req,res,next) =>{
    try{
        const token = req.headers["authtoken"];

        if(!token){
            return res.status(401).send("no token, authorization denied");
        }
        const decoded = jwt.verify(token, "jwtSecret");

        console.log("middleware",decoded)
        req.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(401).send("token invalid")
    }
}

exports.adminCheck = async(req,res,next) =>{
    try{
        const {email} = req.user
        const adminUser = await User.findOne({email}).exec()
        if(adminUser.role !== "admin"){
            res.status(403).send(err, "Admin Access denied")
        }else{
            next()
        }
    }catch(err){
        console.log(err)
        res.status(401).send("token invalid")
    }
}
