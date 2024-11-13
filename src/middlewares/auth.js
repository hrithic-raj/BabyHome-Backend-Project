const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../../.env"})
const AppError = require('../utils/AppError')

const auth = async (req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return next(new AppError('Access Denied. No token provided.',401));
    }
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(decoded.role === "user" || "admin"){
        req.id = decoded.id;
        next();
    }
    }catch(error){
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError('Invalid token.', 400));
        } else {
            return next(new AppError('Internal server error.', 500));
        }
    }
}

module.exports = auth;