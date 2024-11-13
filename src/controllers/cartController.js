const Cart = require('../models/cartModel');
const cartService = require('../services/cartService')
const catchAsync = require('../utils/asyncErrorHandler')


const getCartById = catchAsync(async (req, res, next)=>{
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
});

const addToCart = catchAsync(async (req, res, next) => {
    const userId  = req.id;
    const productId = req.params.productId;
    const count = Number(req.body.data);

    const result = await cartService.addToCart(userId, productId, count);
    res.status(201).json({
        status:"success",
        response: result
    });
});


const deleteCartItem = catchAsync(async (req, res, next) => {
    const userId = req.id;
    const productId = req.params.productId;

    const result = await cartService.deleteCartItem(userId, productId);
    res.status(200).json({
        status:"success",
        response: result
    });
});

const increaseCount = catchAsync(async (req, res, next)=>{
    const userId = req.id;
    const productId = req.params.productId;

    const updatedProducts = await cartService.increaseCount(userId, productId)
    res.status(200).json({
        status:"success",
        message: "product count increased",
        data: updatedProducts
    });
});

const decreaseCount = catchAsync(async (req, res, next)=>{
    const userId = req.id;
    const productId = req.params.productId;
    
    const updatedProducts = await cartService.decreaseCount(userId, productId)
    res.status(200).json({
        status:"success",
        message: "product count decreased",
        data: updatedProducts
    });
});

module.exports = {
    getCartById,
    addToCart,
    deleteCartItem,
    increaseCount,
    decreaseCount,
}