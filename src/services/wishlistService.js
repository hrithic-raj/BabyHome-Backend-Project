const mongoose = require('mongoose')
const Wishlist = require('../models/wishlistModel');
const AppError = require("../utils/AppError");
const { getProductById } = require('./productService');

exports.addToWishlist = async (userId, productId) =>{
    const wishlist = await Wishlist.findOne({userId});
    const product = await getProductById(productId);
    if (!product) throw new AppError("Product not found", 404);

    if(!wishlist){
        const newWishlist = new Wishlist({
            userId,
            products:[productId]
        })
        await newWishlist.save();
    }else{
        const wishlistIndex = wishlist.products.findIndex(item=>item.equals(productId))
        if(wishlistIndex === -1){
            wishlist.products.push(productId);
            await wishlist.save();
        }else{
            wishlist.products = wishlist.products.filter(item=>!item.equals(productId))
            await wishlist.save();
        }
    }
    return await Wishlist.findOne({ userId }).populate('products');
}

exports.deleteFromWishlist = async (userId, productId)=>{
    let wishlist = await Wishlist.findOne({userId});
    const wishlistIndex = wishlist.products.findIndex(item=>item.equals(productId))
    if(wishlistIndex == -1) throw new AppError("product not found in wishlist", 400)
    if(wishlist || wishlist.products.length !== 0){
       wishlist.products = wishlist.products.filter(item=>!item.equals(productId))
       await wishlist.save();
       return await Wishlist.findOne({ userId }).populate('products')
    }
}

exports.getWishlistById = async (userId) =>{
    let wishlist = await Wishlist.findOne({userId}).populate('products');
    if (!wishlist || wishlist.products.length === 0) throw new AppError("wishlist is empty", 204);
    return wishlist;
}