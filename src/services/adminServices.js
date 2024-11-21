const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { getAllProducts } = require("./productServices");

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

//product services

exports.addProduct = async (newProduct) =>{
    const products = new Product(newProduct);
    return await products.save();
}

exports.deleteProductById = async (productId)=>{
    const products = await Product.find();
    if(!products) throw new AppError("something went wrong", 500);
    return await Product.findByIdAndDelete(productId);
}

exports.updateProductById = async (productId, productData)=>{ 
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {$set: productData},
        {new: true, runValidators: true}
    );
    
    if(!updatedProduct) throw new AppError("Product not found", 404);
    
    return updatedProduct;
}

exports.getAllOrders = async ()=>{
    return await Order.find();
}

exports.getTotalRevenue = async () =>{
    const revenue = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalAmount"
                }
            }
        },
        {
            $project: {
                _id:0,
                totalRevenue:1
            }
        }
    ]);
    
    return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

exports.getSoldProductCount = async () =>{
    const soldProducts = await Order.aggregate([
        {
            $unwind: "$items"
        },
        {
            $group:{
                _id:null,
                soldCount:{
                    $sum: "$items.count"
                }
            }
        },
        {
            $project:{
                _id: 0,
                soldCount: 1
            }
        }
    ])
    
    return soldProducts.length > 0 ? soldProducts[0].soldCount : 0;
}