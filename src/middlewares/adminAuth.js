const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../../.env"})

const adminAuth = async (req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message:'Token required'});

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(verifiedToken.role === "admin"){
        req.id = verifiedToken.id;
        next();
    }else{
        res.status(403).json({message:"Access forbidden: Admins only"})
    }
}

module.exports = adminAuth;

//do try and catch and custom error