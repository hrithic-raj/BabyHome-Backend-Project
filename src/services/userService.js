const User = require("../models/userModel");

exports.addUser = async (userData) =>{
    const user = new User(userData);
    return await user.save();
}

exports.getAllUsers = async ()=>{
    return await User.find();
}

exports.getUserById = async (UserId) =>{
    return await User.findById(UserId);
}