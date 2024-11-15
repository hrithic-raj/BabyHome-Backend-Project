const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/asyncErrorHandler');
const AppError = require('../utils/AppError');
require('dotenv').config({path:"../../.env"})

const adminAuth = catchAsync(async (req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message:'Token required'});

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(verifiedToken.role === "admin"){
        req.adminId = verifiedToken.id;
        next();
    }else{
        next(new AppError('Access forbidden: Admins only', 403));
    }
});

module.exports = adminAuth;

//do try and catch and custom error