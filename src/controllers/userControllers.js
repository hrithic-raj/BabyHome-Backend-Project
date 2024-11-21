const userService = require('../services/userServices');
const hashingPassword = require('../utils/hashingPassword');
const tokenCreator = require('../utils/tokenCreator');
const catchAsync = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

const signup = catchAsync(async (req, res, next)=>{
    const {name, email, username, password, role} = req.body;

    const existUser = await userService.getUserByUsername(username)
    if(existUser) return next(new AppError( 'username already taken', 400));
    
    const existEmail = await userService.getUserByEmail(email)
    if(existEmail) return next(new AppError( 'email already exist', 400));

    const hashedPass = await hashingPassword.hash(password);
    const user = await userService.addUser({name, email, username, password: hashedPass, role});
    res.status(201).json({
        status: "success",
        message: "User registered",
        data: user
    });
});

const login = catchAsync(async (req, res, next) =>{
    const {username, password} = req.body;
    const user = await userService.getUserByUsername(username);
    if(!user) return next(new AppError( 'invalid username or password', 400));

    const isMatch = await hashingPassword.compare(password, user.password);
    if(!isMatch) return next(new AppError( 'invalid username or password', 400 ));
    
    const token = await tokenCreator(user.id, user.role);
    res.status(200).json({
        status:"success",
        message: "User login successfull",
        token,
    });
});

module.exports = {
    signup,
    login,
}