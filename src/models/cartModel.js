const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true},
            count: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: true },
            oldTotalPrice: { type: Number }
        }
    ],
    platformFee: {type: Boolean, default: true},
    delivaryCharge: {type: Boolean, default: false},
    oldTotalCartPrice: { type: Number, default: 0 },
    totalCartPrice: { type: Number, default: 0 }
})
const Cart = mongoose.model('Carts',cartSchema)

module.exports = Cart;