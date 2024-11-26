const userService = require('../services/userServices');
const hashingPassword = require('../utils/hashingPassword');
const tokenCreator = require('../utils/tokenCreator');
const catchAsync = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const signup = catchAsync(async (req, res, next)=>{
    const {name, email, username, password} = req.body;

    const existUser = await userService.getUserByUsername(username)
    if(existUser) return next(new AppError( 'Username already taken', 400));
    
    const existEmail = await userService.getUserByEmail(email)
    if(existEmail) return next(new AppError( 'Email exist please login', 400));

    //password hashing
    const hashedPass = await hashingPassword.hash(password);
    const user = await userService.addUser({
        name,
        email,
        username,
        password: hashedPass
    });

    //generate token
    const token = await tokenCreator(user.id, user.role);

    res.status(201).json({
        status: "success",
        message: "User registered",
        data: {
            user:{
                id:user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role:user.role
            },
            token
        }
    });
});

const login = catchAsync(async (req, res, next) =>{
    const {username, password} = req.body;
    const user = await userService.getUserByUsername(username);
    if(!user) return next(new AppError( 'invalid username or password', 400 ));

    const isMatch = await hashingPassword.compare(password, user.password);
    if(!isMatch) return next(new AppError( 'invalid username or password', 400 ));
    
    const token = await tokenCreator(user.id, user.role);

    res.status(200).json({
        status: "success",
        message: "User login successfull",
        data: {
            user:{
                id:user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role:user.role
            },
            token
        }
    });
});

const getUserFromToken = catchAsync(async (req, res, next)=>{
    const userId = req.id;
    
    const user = await User.findById(userId);
    res.status(201).json({
        status:"success",
        message:"user fetched successfully",
        response: user
    });
})
module.exports = {
    signup,
    login,
    getUserFromToken
}