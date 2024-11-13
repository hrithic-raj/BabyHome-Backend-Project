const User = require("../models/userModel");


exports.getAllUsers = async ()=>{
    return await User.find();
}

exports.getUserById = async (UserId) =>{
    return await User.findById(UserId);
}