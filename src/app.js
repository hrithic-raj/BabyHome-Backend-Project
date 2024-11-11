const express = require('express');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const addressRouter = require('./routes/addressRoute');
const wishlistRouter = require('./routes/wishlistRoute');
const app = express();

app.use(express.urlencoded({extended: true}));

app.use('/store', productRouter)
app.use(userRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use(addressRouter)
app.use(wishlistRouter)

module.exports = app;