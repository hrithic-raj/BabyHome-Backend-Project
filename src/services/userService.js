const User = require("../models/userModel");

exports.addUser = async (userData) =>{
    const user = new User(userData);
    return await user.save();
}

exports.getUserByUsername = async (username) =>{
    return await User.findOne({username});
}