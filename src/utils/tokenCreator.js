const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../../.env"});

const tokenCreator = (userId, role)=>{
    return jwt.sign({id:userId, role}, process.env.JWT_SECRET, { expiresIn : '9h' })
}

module.exports = tokenCreator;