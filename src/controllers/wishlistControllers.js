const wishlistService = require('../services/wishlistServices')
const catchAsync = require('../utils/asyncErrorHandler')

const addToWishlist = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const productId = req.params.productId;
    const wishlist = await wishlistService.addToWishlist(userId, productId);
    res.status(200).json({
        status:"success",
        message: "product added to the wishlist successfully",
        data: wishlist
    });
});

const deleteFromWishlist = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const productId = req.params.productId;
    const wishlist = await wishlistService.deleteFromWishlist(userId, productId);
    res.status(200).json({
        status:"success",
        message: "product removed from wishlist",
        data: wishlist
    });
});

const getWishlistById = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const wishlist = await wishlistService.getWishlistById(userId);
    res.status(200).json({
        status:"success",
        data: wishlist
    });
});
const checkWishlistById = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const productId = req.params.productId;
    const wishlist = await wishlistService.checkWishlistById(userId, productId);
    res.status(200).json({
        status:"success",
        data: wishlist
    });
});

module.exports = {
    addToWishlist,
    deleteFromWishlist,
    getWishlistById,
    checkWishlistById,
}