const router = require('express').Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

//Register new user
router.post("/register", async(req, res) => {
    try {
        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
        res.status(400).json('User already exists');
    }
    }
})

//Login user
router.post("/login", async(req, res) =>{
    try {
        //Check username
       const user = await User.findOne({username: req.body.username})
       !user && res.status(400).json("Invalid Credentials")
       
       //Validate user password
       const valid = await bcrypt.compare(req.body.password, user.password);
       !valid && res.status(400).jsoon("Invalid Credentials");
       
       //prevent password from being displayed in response
       const{password, ...others} = user._doc;
       res.status(200).json(others);
    } catch (error) {
        const userExists = await User.findOne({email});
        if(!userExists){
        res.status(404)
        throw new Error('User not found');
    }
    }
})

module.exports = router;