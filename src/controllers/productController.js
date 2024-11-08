const express = require('express')
const app = require('../app')
const { getAllProducts, getProductById, getProductByCategory } = require('../services/productService')

const allProducts = async (req, res)=>{
    const category = req.query.category;
    let products;
    if(category) products = await getProductByCategory(category);
    else products = await getAllProducts();
    
    if(!products.length) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : products});
}

const productById = async (req, res)=>{
    const productId = req.params.id;
    const product = await getProductById(productId);
    
    if(!product) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : product});
}

module.exports = {
    allProducts,
    productById,
}