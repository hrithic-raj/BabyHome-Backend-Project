const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../../.env"})

const auth = async (req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message:'Token required'});

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(verifiedToken.role === "user" || "admin"){
        req.id = verifiedToken.id;
        next();
    }else{
        res.status(403).json({message:"Access forbidden: Admins only"})
    }
}

module.exports = auth;