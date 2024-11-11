const express = require('express')
const app = require('../app')
const productService = require('../services/productService')

const allProducts = async (req, res)=>{
    const category = req.query.category;
    let products;
    if(category) products = await productService.getProductByCategory(category);
    else products = await productService.getAllProducts();
    
    if(!products.length) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : products});
}

const productById = async (req, res)=>{
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    
    if(!product) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : product});
}

const getBestSellers = async (req, res)=>{
    const product = await productService.getBestSellers();
    
    if(!product) return res.status(400).json({message:"Error Fetching BestSellers"});
    res.json({status : "fetching success", data : product});
}
const getNewlyAdded = async (req, res)=>{
    const product = await productService.getNewlyAdded();
    
    if(!product) return res.status(400).json({message:"Error Fetching NewlyAdded"});
    res.json({status : "fetching success", data : product});
}

module.exports = {
    allProducts,
    productById,
    getBestSellers,
    getNewlyAdded,
}