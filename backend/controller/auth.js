
const bcrypt = require('bcryptjs')
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const Token = require("../models/token")
const crypto = require("crypto");
const { useReducer } = require('react');
const sendEmail = require('../sendEmail.js');
const mongoose = require("mongoose");
exports.register = async(req,res)=>{
    try{
        //Check user
        const {username,firstname,lastname,email, password} = req.body;
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send("User Already exists");
        }const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            firstname,
            lastname,
            email,
            password,
        });
        user.password = await bcrypt.hash(password, salt);
        user = await user.save();
        if(!user.verify){
            let tokens = await Token.findOne({userId: user._id});
            if(!tokens){
                const tokens = await new Token({
                    userId: user._id,
                    tokens: crypto.randomBytes(32).toString("hex")
                }).save();
                const url = `https://modnaeee.onrender.com/api/users/${user._id}/verify/${tokens.tokens}`;
                await sendEmail(user.email, "Verify Email",url);
                console.log(url);
            }
            return res.status(200).send("An Email send to your account");
        }

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}


exports.login = async (req,res)=>{
    try{
        const { email, password} = req.body;
        var user = await User.findOneAndUpdate({email},{new:true});
        if(user && user.verify){
            //check password
            const isMatch = await bcrypt.compare(password, user.password);
            
            if(!isMatch){
                return res.status(400).send("Password invalid")
            }

            //Payload
            const payload = {
                user:{
                    username: user.username,
                    firstname:user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                }
            }
            //generate token
            jwt.sign(payload, "jwtSecret",
            {expiresIn: '7d'},
            (err,token)=>{
                if(err) throw err;
                res.status(200).json({token,payload})
            })
            res.status(200)
        }else if(user && !user.verify){
            let tokens = await Token.findOne({userId: user._id});
                if(!tokens){
                    const tokens = await new Token({
                        userId: user._id,
                        tokens: crypto.randomBytes(32).toString("hex")
                    }).save();
                    const url = `https://modnaeee.onrender.com/api/users/${user._id}/verify/${tokens.tokens}`;
                    await sendEmail(user.email, "ยืนยันการลงทะเบียนเข้าใช้เว็บไซต์ MODNAE",url);
                    
                }
               return res.status(200).send("An Email send to your account");
        }else{
        return res.status(400).send("User not found")
        }

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}

exports.currentUser = async(req,res)=>{
    try{
        console.log('controller',req.user);
        const user = await User.findOne({email:req.user.email}).select("-password").exec();
        console.log('user',user);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}

exports.verifyUser = async(req,res)=>{
    try{
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid link: missing or invalid user ID");
          }
        const user = await User.findOne({_id:req.params.id});
        if(!user) return res.status(400).send("Invalid link");
        const tokens = await Token.findOne({
            userId: user._id,
            tokens: req.params.tokens
        });
        if(!tokens) return res.status(400).send("Invalid link");
        await User.updateOne({_id: user._id},{verify: true});
        await tokens.deleteOne()
        res.status(200).send("Email veryfied")
    }catch(err){
        res.status(500).send(err,"Server error jaa");
}
}

exports.listUser = async(req,res)=>{
    try{
        res.send("list get user")
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}


exports.updateUser = async(req,res)=>{
    const { email, password, newpassword } = req.body;
    const encryptedPassword = await bcrypt.hash(newpassword,10)
    const user = await User.findOne({email});
    if(user){
        
        const isMatch = await bcrypt.compare(password, user.password);
            
        if(!isMatch){
            return res.status(400).send("Password invalid")
        }
        try{
            await User.updateOne({email: email}, {
                password: encryptedPassword, 
            });
            res.status(200).send("Edit user")
        }catch(err){
            console.log(err)
            res.status(500).send("Server Error")
        }
        

    }

}
exports.deleteUser = async(req,res)=>{
    try{
        res.send("Remove user")
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
}