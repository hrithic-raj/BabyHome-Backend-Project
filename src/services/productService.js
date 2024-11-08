const Product = require("../models/productModel");

const getAllProducts = async ()=>{
    return await Product.find();
}

const getProductById = async (ProductId) =>{
    return await Product.findById(ProductId);
}

const getProductByCategory = async (category) =>{
    return await Product.find({category})
}
module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
}