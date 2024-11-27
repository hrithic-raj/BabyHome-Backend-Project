const adminService = require('../services/adminServices');
const { getProductById } = require('../services/productServices');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/asyncErrorHandler');
const orderService = require('../services/orderServices');
const User = require('../models/userModel');

//Users controllers:-

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
    res.status(200).json({
        status : "success",
        message:"User blocked successfully",
        data : user
    });
});


//Product controllers:-

const addProduct = catchAsync(async (req, res, next)=>{
    let newProduct = req.body.productData;
    const result = await adminService.addProduct(newProduct);
    res.status(201).json({
        status : "success",
        message:"product added successfully",
        data : result
    });
});

const deleteProductById = catchAsync(async (req, res, next)=>{
    const productId = req.params.productId;
    const result = await adminService.deleteProductById(productId)
    res.status(200).json({
        status : "success",
        message:"product deleted successfully",
        data : result
    });
});

const updateProductById = catchAsync(async (req, res, next)=>{
    const productId = req.params.productId;
    const productData = req.body;
    
    const updatedProduct = await adminService.updateProductById(productId, productData);
    res.status(200).json({
        status : "success",
        message:"product updated successfully",
        data : updatedProduct
    });
})

const getAllOrders = catchAsync(async (req, res, next)=>{
    const orders = await adminService.getAllOrders();
    res.status(200).json({
        status : "success",
        message:"All orders fetched successfully",
        data : orders
    });
});

const getTotalRevenue = catchAsync(async (req, res, next)=>{
    const totalRevenue = await adminService.getTotalRevenue();
    
    res.status(200).json({
        status : "success",
        message:"Total revenue calculated successfully",
        data : totalRevenue
    });
});

const getSoldProductCount = catchAsync(async (req, res, next)=>{
    const soldProduct = await adminService.getSoldProductCount();
    
    res.status(200).json({
        status : "success",
        message:"Total sold product's count fetched successfully",
        data : soldProduct
    });
});

const adminGetOrdersById = catchAsync(async (req, res, next)=>{
    const userId = req.params;
    const order = await orderService.getOrdersById(userId)
    res.status(200).json({
        status:"success",
        data: order
    });
});


//admin

const getAdminFromToken = catchAsync(async (req, res, next)=>{
    const adminId = req.adminId;
    
    const admin = await User.findById(adminId);
    res.status(201).json({
        status:"success",
        message:"admin fetched successfully",
        response: admin
    });
})

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    blockUserById,
    addProduct,
    deleteProductById,
    updateProductById,
    getAllOrders,
    getTotalRevenue,
    getSoldProductCount,
    adminGetOrdersById,
    getAdminFromToken
}