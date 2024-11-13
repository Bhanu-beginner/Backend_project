const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();


router.post("/signup", async (req, res)=>{
    try{
         const {email, password, name, phone} = req.body;
         const isUserExist =  await User.findOne({email});
           if(isUserExist){
            res.status(400).json({message:"Email already exists"});
            return
    }
    else{
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await new User({email, password: hashedPassword, name, phone}).save();
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        return res.status(200).json({message:"User created successfully", token, id: newUser._id});
    }
}
catch(error){
    console.log(error);
        res.status(500).json({message:"Server Error"});
    }
});

router.post("/signin", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message: "These r not valid details"});
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message:"Not the correct one"});
            return
        }
        const token = jwt.sign({email},process.env.JWT_SECRET);
        return res.status(200).json({message:"Login Successful", token, id: user._id});
    }
    catch(error){
            res.status(500).json({message:"Server Error"});
        }
});


module.exports = router;