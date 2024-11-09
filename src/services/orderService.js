const Cart = require('../models/cartModel')
const Order = require('../models/orderModel')

exports.createOrder = async (userId, paymentMethod) =>{
    const cart = await Cart.findOne({userId}).populate('products.productId');
    if(!cart || cart.products.length === 0){
        throw new Error('Cart is Empty');
    }

    const items = cart.products.map(item=>({
        productId: item.productId._id,
        count: item.count,
        price: item.price
    }));

    const totalAmount = cart.totalCartPrice;
    const order = new Order({userId, items, paymentMethod, totalAmount});
    await order.save();
    
    //clear cart
    cart.products = [];
    cart.totalCartPrice = 0;
    await cart.save()

    return order;
}

exports.getOrdersById = async (userId) =>{
    const orders = await Order.findOne({userId}).populate('items.productId')
    if(!orders) throw new Error('No orders found');
    return orders;
}