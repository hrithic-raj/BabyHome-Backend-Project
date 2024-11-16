const User = require("../models/userModel");
const AppError = require("../utils/AppError");

//users
exports.getAllUsers = async ()=>{
    return await User.find();
}

exports.getUserById = async (userId) =>{
    return await User.findById(userId);
}

exports.deleteUserById = async (userId) =>{
    const user = await User.findById(userId) 
    if(!user){
        throw new AppError("User not found", 404);
    }
    await User.findByIdAndDelete(userId);
    return await this.getAllUsers();
}

exports.blockUserById = async (userId) =>{
    let user = await User.findById(userId)
    if(!user){
        throw new AppError("User not found", 404);
    }

    if(user.block){
        user.block = false;
    }else{
        user.block = true;
    }
    await user.save();
    return user;
}

//product
// exports.addProduct = async () =>{

// }