const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../../.env"});

const tokenCreator = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET, { expiresIn : '10h' })
}

module.exports = tokenCreator;