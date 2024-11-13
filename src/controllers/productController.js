const express = require('express')
const app = require('../app')
const productService = require('../services/productService')

const allProducts = async (req, res)=>{
    try{
        const category = req.query.category;
        let products;
        if(category) products = await productService.getProductByCategory(category);
        else products = await productService.getAllProducts();
        
        if(!products.length) return res.status(400).json({message:"bad request"});
        
        res.status(200).json({
            status : "fetching success",
            data : products
        });
    }catch(error){
        res.status(500).json({message: "Error fetching all products", error: error.message});
    }
}

const productById = async (req, res)=>{
    try{
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        
        if(!product) return res.status(400).json({message:"bad request"});
        
        res.status(200).json({
            status : "fetching success", 
            data : product
        });
    }catch(error){
        res.status(500).json({message: "Error fetching product", error: error.message});
    }
}

const getBestSellers = async (req, res)=>{
    try{
        const product = await productService.getBestSellers();
        
        if(!product) return res.status(400).json({message:"Error Fetching BestSellers"});
        
        res.status(200).json({
            status : "fetching success", 
            data : product
        });
    }catch(error){
        res.status(500).json({message: "Error fetching Bestsellers", error: error.message});
    }
}
const getNewlyAdded = async (req, res)=>{
    try{
        const product = await productService.getNewlyAdded();
        
        if(!product) return res.status(400).json({message:"Error Fetching NewlyAdded"});
        res.status(200).json({
            status : "fetching success",
            data : product
        });
    }catch(error){
        res.status(500).json({message: "Error fetching Newlyadded", error: error.message});
    }
}

module.exports = {
    allProducts,
    productById,
    getBestSellers,
    getNewlyAdded,
}