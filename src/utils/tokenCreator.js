const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../../.env"});

const tokenCreator = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET, { expiresIn : '9h' })
}

module.exports = tokenCreator;