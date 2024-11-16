const adminService = require('../services/adminService');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/asyncErrorHandler');

const getAllUsers = catchAsync(async (req, res, next)=>{
    const users = await adminService.getAllUsers();

    if(!users.length===0) return next(new AppError("bad request", 400));
    res.status(200).json({
        status : "success",
        message:"All users fetching successfull",
        data : users
    });
});

const getUserById = catchAsync(async (req, res, next)=>{
    const userId = req.params.userId;
    const user = await adminService.getUserById(userId);
    
    if(!user) return next(new AppError("bad request", 400));
    res.status(200).json({
        status : "fetching success",
        message:"user fetching successfull",
        data : user
    });
});

const deleteUserById = catchAsync(async (req, res, next)=>{
    const userId = req.params.userId;
    const users = await adminService.deleteUserById(userId);
    
    res.status(200).json({
        status : "success",
        message:"user Deleted successfully",
        data : users
    });
});

const blockUserById = catchAsync(async (req, res, next)=>{
    const userId = req.params.userId;
    const user = await adminService.blockUserById(userId);
    
    if(!user) return next(new AppError("bad request", 400));
    res.status(200).json({
        status : "success",
        message:"User blocked successfully",
        data : user
    });
});



module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    blockUserById,
}