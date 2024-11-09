const Product = require("../models/productModel");

exports.getAllProducts = async ()=>{
    return await Product.find();
}

exports.getProductById = async (ProductId) =>{
    return await Product.findById(ProductId);
}

exports.getProductByCategory = async (category) =>{
    return await Product.find({category})
}
