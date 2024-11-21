const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');

exports.addToCart = async (userId, productId, count) => {
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    const price = product.price;
    const totalPrice = price * count;
    const oldTotalPrice = (product.oldprice || price) * count;

    let cart = await Cart.findOne({ userId });

    if (cart) {
        const productIndex = cart.products.findIndex(item => item.productId.equals(productId));

        if (productIndex >= 0) {
            cart.products[productIndex].count += count;
            cart.products[productIndex].totalPrice = price * cart.products[productIndex].count;
            cart.products[productIndex].oldTotalPrice = (product.oldprice || price) * cart.products[productIndex].count;
        } else {
            cart.products.push({ productId, count, price, totalPrice, oldTotalPrice });
        }

        cart.totalCartPrice = cart.products.reduce((total, item) => total + item.totalPrice, 0);
        await cart.save();
    } else {
        cart = new Cart({
            userId,
            products: [{ productId, count, price, totalPrice, oldTotalPrice }],
            totalCartPrice: totalPrice
        });
        await cart.save();
    }

    return { message: "Product added/updated in cart successfully!" };
};


exports.deleteCartItem = async (userId, productId)=>{
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);
    
    cart.products = cart.products.filter((item) => !item.productId.equals(productId));
    cart.totalCartPrice = cart.products.reduce((total, item) => total + item.totalPrice, 0);
    
    await cart.save();
    return { message: "Product deleted from cart successfully!" };
}

exports.increaseCount = async (userId, productId)=>{
    const cart = await Cart.findOne({userId});
    if (!cart) throw new AppError( "Cart not found", 404 );
    
    const product = cart.products.find((item)=>item.productId.equals(productId))
    if (!product) throw new AppError("Product not found in cart", 404);
    
    product.count += 1;
    product.totalPrice = product.price * product.count;
    product.oldTotalPrice = (product.oldprice || product.price) * product.count;

    cart.totalCartPrice = cart.products.reduce((total, item)=> total + item.totalPrice,0);
    await cart.save();
    return cart.products;
}


exports.decreaseCount = async (userId, productId)=>{
    const cart = await Cart.findOne({userId});
    if (!cart) throw new AppError("Cart not found", 404);
    
    const product = cart.products.find((item)=>item.productId.equals(productId))
    if (!product) throw new AppError("Product not found in cart", 404);

    product.count -= 1;
    product.totalPrice = product.price * product.count;
    product.oldTotalPrice = (product.oldprice || product.price) * product.count;

    cart.totalCartPrice = cart.products.reduce((total, item)=> total + item.totalPrice,0);
    await cart.save();
    return cart.products;
}