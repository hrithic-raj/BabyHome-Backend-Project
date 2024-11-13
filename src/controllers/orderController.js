const orderService = require('../services/orderService')
const catchAsync = require('../utils/asyncErrorHandler')

const createOrder = catchAsync(async (req, res, next)=>{
    const userId = req.id;
    const paymentMethod = req.body.paymentMethod;
    const addressId = req.params.addressId;
    if(!addressId) return res.status(400).json({message:" address not found "})
    // const method = paymentMethod.toString()
    const order = await orderService.createOrder(userId, paymentMethod, addressId);
    res.status(201).json({
        status:"success",
        message: "Order placed successfully",
        data: order
    });
});

const getOrdersById = catchAsync(async (req, res, next)=>{
    const userId = req.id;
    const order = await orderService.getOrdersById(userId)
    res.status(200).json({
        status:"success",
        data: order
    });
});

module.exports = {
    createOrder,
    getOrdersById,
}