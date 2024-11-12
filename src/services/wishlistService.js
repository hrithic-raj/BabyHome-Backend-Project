const mongoose = require('mongoose')
const Wishlist = require('../models/wishlistModel');
const Cart = require('../models/cartModel');

exports.addToWishlist = async (userId, productId) =>{
    const wishlist = await Wishlist.findOne({userId});
    // console.log(wishlist);
    
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
    if(wishlist){
       wishlist.products = wishlist.products.filter(item=>!item.equals(productId))
       await wishlist.save();
       return await Wishlist.findOne({ userId }).populate('products')
    }
}

exports.getWishlistById = async (userId) =>{
    let wishlist = await Wishlist.find({userId}).populate('products');
    if (!wishlist) throw new Error("wishlist not found");
    return wishlist;
}