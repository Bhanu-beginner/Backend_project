const express = require("express");
const router = express.Router();
const Job = require("../schemas/jobSchema");
const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const {isLoggedIn} = require("../middleware/auth")
env.config();

router.post("/", isLoggedIn, async (req, res)=>{
    try{
        const {title, description, salary, location} = req.body;
        const user = await User.findOne({email: req.user.email});
        const newJob = await new Job({title, description, salary, location, userId: user._id}).save();
        return res.status(200).json({message: "Job created successfully", id: newJob._id});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

router.put("/:id", isLoggedIn, async (req, res)=>{
    try{
        const {title, description, salary, location} = req.body;
        const user = await User.findOne({email: req.user.email});
        const job = await Job.findOne({_id: req.params.id, userId: user._id});
        if(!job){ 
            res.status(400).json({message: "Job not found", id: newJob._id});
            return
        }
        job.title = title;
        job.description = description;
        job.salary = salary;
        job.location = location;
        await job.save();
        return res.status(200).json({message: "Job updated successfully"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

router.delete("/:id", isLoggedIn, async (req, res)=>{
    try{
        const user = await User.findOne({email: req.user.email});
        const job = await Job.findOne({_id: req.params.id, userId: user._id});
        if(!job){ 
            res.status(400).json({message: "Job not found"});
            return
        }
        await Job.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Job removed successfully"});
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

router.get("/:id", async (req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            res.status(400).json({message: "Job not found"});
            return
        }
        return res.status(200).json(job);
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;