const express = require('express');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(productRouter)
app.use(userRouter)
app.use('/cart', cartRouter)
app.use( orderRouter)

module.exports = app;