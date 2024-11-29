const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.getAllProducts = async (skip, limit)=>{
    return await Product.find().skip(skip).limit(limit);
}

exports.getProductByCategory = async (category, skip, limit) =>{
    return await Product.find({category}).skip(skip).limit(limit);
}

exports.getProductById = async (ProductId) =>{
    return await Product.findById(ProductId);
}

exports.getBestSellers = async () =>{
    return await Product.find({bestseller: true})
}

exports.getNewlyAdded = async () =>{
    return await Product.find({newlyadded: true})
}

exports.getTotalCountByCategory = async (category) => {
    return await Product.countDocuments({ category });
};

exports.getTotalCount = async () => {
    return await Product.countDocuments();
};