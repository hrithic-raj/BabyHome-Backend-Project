const wishlistService = require('../services/wishlistService')

const addToWishlist = async (req, res) =>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const wishlist = await wishlistService.addToWishlist(userId, productId);
        res.status(200).json({
            status:"success",
            message: "product added to the wishlist successfully",
            data: wishlist
        });
    }catch(error){
        res.status(500).json({
            message: "Error adding to wishlist",
            error: error.message
        })
    }
}

const deleteFromWishlist = async (req, res) =>{
    try{
        const userId = req.id;
        const productId = req.params.productId;
        const wishlist = await wishlistService.deleteFromWishlist(userId, productId);
        res.status(200).json({
            status:"success",
            message: "product removed from wishlist",
            data: wishlist
        });
    }catch(error){
        res.status(500).json({
            message: "Error deleting from wishlist", 
            error: error.message
        })
    }
}

const getWishlistById = async (req, res) =>{
    try{
        const userId = req.id;
        const wishlist = await wishlistService.getWishlistById(userId);
        res.status(200).json({
            status:"success",
            data: wishlist
        });
    }catch(error){
        res.status(500).json({
            message: "Error fetching wishlist", 
            error: error.message
        })
    }
}

module.exports = {
    addToWishlist,
    deleteFromWishlist,
    getWishlistById,
}