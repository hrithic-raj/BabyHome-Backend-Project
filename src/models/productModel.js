const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    price : {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    images: {type: [String]},
    oldprice: {type: Number, required: true},
    bestseller: { type: Boolean, default: false },
    newlyadded: { type: Boolean, default: false },
    stock: {type: Number, required: true},
    rating:{type: Number, required: true}
})
const Product = mongoose.model("Products",productSchema);

module.exports = Product;