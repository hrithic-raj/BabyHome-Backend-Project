const wishlistService = require('../services/wishlistService')

const addToWishlist = async (req, res) =>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const wishlist = await wishlistService.addToWishlist(userId, productId);
        res.json(wishlist);
    }catch(error){
        res.status(500).json({message: "Error adding to cart", error: error.message})
    }
}

const deleteFromWishlist = async (req, res) =>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const wishlist = await wishlistService.deleteFromWishlist(userId, productId);
        res.json(wishlist);
    }catch(error){
        res.status(500).json({message: "Error adding to cart", error: error.message})
    }
}

const getWishlistById = async (req, res) =>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const wishlist = await wishlistService.getWishlistById(userId);
        res.json(wishlist);
    }catch(error){
        res.status(500).json({message: "Error adding to cart", error: error.message})
    }
}

module.exports = {
    addToWishlist,
    deleteFromWishlist,
    getWishlistById,
}