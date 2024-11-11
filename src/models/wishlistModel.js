const mongoose = require('mongoose')

const wishlistScema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true}]
});

const Wishlist = mongoose.model('Wishlists', wishlistScema);

module.exports = Wishlist;