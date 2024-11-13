const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.addUser = async (userData) =>{
    const user = new User(userData);
    return await user.save();
}

exports.getUserByUsername = async (username) =>{
    return await User.findOne({username});
}

exports.getUserByEmail = async (email) =>{
    return await User.findOne({email});
}