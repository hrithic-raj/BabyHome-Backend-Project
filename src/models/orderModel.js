const mongoose = require('mongoose')
const Product = require('./productModel')

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    items: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
            count: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    paymentMethod: {type: String, required: true},
    deliveryAddress:{type: Object, ref:'Address', required: true},
    totalAmount: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;