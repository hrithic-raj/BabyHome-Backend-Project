const User = require("../models/userModel");

const addUser = async (userData) =>{
    const user = new User(userData);
    return await user.save();
}

const getAllUsers = async ()=>{
    return await User.find();
}

const getUserById = async (UserId) =>{
    return await User.findById(UserId);
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
}