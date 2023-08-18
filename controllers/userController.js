const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//@desc to register 
//@route POST /api/users/egister
//@acess public

const registerUser = asyncHandler(async (req,res)=>{
    const{username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    // console.log(req.body.email)
    const useravialable = await User.findOne({email:req.body.email});
    if(useravialable){
        res.status(400);
        throw new Error("User already exists with this email");
        
    }
    //hash password
    const hashedpassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password:hashedpassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    // res.send({message:"Register user"})
});

//@desc to login
//@route POST /api/users/login
//@acess public

const loginUser = asyncHandler(async (req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({email:req.body.email});
    if(user && await(bcrypt.compare(password,user.password))){
        const acessToken = jwt.sign({
            user:{
                username:user.username, 
                email:user.email,
                id:user._id
            }
        },process.env.JWT_SECRET,
        {expiresIn:"15m"}
        )//payload
        res.status(200).json({acessToken})
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.send({message:"Login user"})
});

//@desc to get current user
//@route GET /api/users/current
//@acess private

const currentUser = asyncHandler(async (req,res)=>{
    // res.send({message:"Current user"});
    res.json(req.user)
});
module.exports = {registerUser,loginUser,currentUser}