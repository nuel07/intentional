const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@desc Register a user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Name, email and password required')
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: genJwt(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid data');
    }
})

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;

    //check for user email
    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: genJwt(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials');
    }
    res.status(200).json({message: 'Login user'});
})

//@desc Get user data
//@route GET /api/users/
//@access Private
const getUser = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc
        res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);  
    }
    res.status(200).json(req.user);
})

//@desc Update user data
//@route PUT /api/users/update
//@access Private
const updateUser = asyncHandler(async(req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const newhashedpassword = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true})
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
        } else {
            console.log("Unauthorized access");

    }
})

//@desc delete user data
//@route DELETE /api/settings/delete
//@access Private
const deleteUser = asyncHandler(async(req, res) => {
    if(req.body.userId === req.params.id){
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(`${deletedUser} has been deleted`)
        } catch (error) {
            res.status.json(error);
        }
    } else {
        console.log("Unauthorized")
    }
    res.status(200).json(req.user);
})

//Generate JWT
const genJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}