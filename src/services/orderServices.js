const Cart = require('../models/cartModel')
const Order = require('../models/orderModel');
const addressService = require('./addressServices')
const mongoose = require('mongoose')
const AppError = require('../utils/appError')

exports.createOrder = async (userId, paymentMethod, addressId) =>{
    const cart = await Cart.findOne({userId}).populate('products.productId');
    if(!cart || cart.products.length === 0){
        throw new AppError('Cart is Empty, add product to cart', 204);
    }
    
    const items = cart.products.map(item=>({
        productId: item.productId._id,
        count: item.count,
        price: item.price
    }));
    
    const totalAmount = cart.totalCartPrice;
    const deliveryAddress = await addressService.getAddressById(userId, addressId);
    if(!deliveryAddress){
        throw new AppError('Address id not valid', 400);
    }
    
    const order = new Order({userId, items, paymentMethod, totalAmount, deliveryAddress});
    await order.save();
    
    //clear cart
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save()

    return order;
}

exports.getOrdersById = async (userId) =>{
    const orders = await Order.aggregate([
        {$match: {userId: new mongoose.Types.ObjectId(userId)}},
        {$unwind: '$items'},
        {
            $lookup:{
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'items.productDetails'
            }
        }
    ])
    if(!orders || orders.length === 0) throw new AppError('No orders found', 404);
    return orders;
}