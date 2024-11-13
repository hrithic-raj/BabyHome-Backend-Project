const bcrypt = require('bcrypt');

exports.hash= async (password) =>{
    return await bcrypt.hash(password, 10);
}

exports.compare= async (password, hashedPass) =>{
    return await bcrypt.compare(password, hashedPass);
}