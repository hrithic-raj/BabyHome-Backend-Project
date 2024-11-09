const mongoose = require('mongoose')
const Product = require('./productModel')

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    items: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
            count: {type: Number, required: true},
            price: {type: Number, required: true}
        }
    ],
    totalPrice: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;