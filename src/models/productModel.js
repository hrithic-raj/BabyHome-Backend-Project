const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    price : {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String},
    images: {type: [String],  required: true},
    oldprice: {type: Number, required: true},
    bestseller: { type: Boolean, default: false },
    newlyadded: { type: Boolean, default: false },
    stock: {type: Number, required: true},
    rating:{type: Number}
})
const Product = mongoose.model("Products",productSchema);

module.exports = Product;