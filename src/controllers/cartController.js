const express = require('express')
const app = require('../app');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const cartService = require('../services/cartService')

const getCartById = async (req, res)=>{
    try{
        const userId = req.id;
        
        const cart = await Cart.findOne({userId}).populate({
            path:'products.productId',
            model: 'Products',
        });
        res.status(200).json(cart?{
            status: "success",
            data: cart.products
        }:{
            status: "success",
            message: "your cart is empty"
        });
        res.json();
    }catch(error){
        res.status(500).json({ message: "Error fetching cart", error });
    }
}

const addToCart = async (req, res) => {
    try {
        const userId  = req.id;
        const productId = req.params.productId;
        const count = Number(req.body.data);

        const result = await cartService.addToCart(userId, productId, count);
        res.status(201).json({
            status:"success",
            message: "product added to the cart successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};


const deleteCartItem = async (req, res) => {
    try {
        const userId = req.id;
        const productId = req.params.productId;

        const result = await cartService.deleteCartItem(userId, productId);
        res.status(200).json({
            status:"success",
            message: "product removed from cart",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
};

const increaseCount = async (req, res)=>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const updatedProducts = await cartService.increaseCount(userId, productId)
        res.status(200).json({
            status:"success",
            message: "product count increased",
            data: updatedProducts
        });
    }catch(error){
        res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
}

const decreaseCount = async (req, res)=>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const updatedProducts = await cartService.decreaseCount(userId, productId)
        res.status(200).json({
            status:"success",
            message: "product count decreased",
            data: updatedProducts
        });
    }catch(error){
        res.status(500).json({ message: "Error removing item from cart", error: error.message });   
    }
}

module.exports = {
    getCartById,
    addToCart,
    deleteCartItem,
    increaseCount,
    decreaseCount,
}