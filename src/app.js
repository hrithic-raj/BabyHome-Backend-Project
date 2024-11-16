const express = require('express');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const addressRouter = require('./routes/addressRoute');
const wishlistRouter = require('./routes/wishlistRoute');
const adminRouter = require('./routes/adminRoute');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const mongooseErrorHandler = require('./middlewares/mongooseErrorHandler');
const app = express();

app.use(express.urlencoded({extended: true}));

//routes
app.use('/store', productRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use('/address', addressRouter)
app.use('/wishlist', wishlistRouter)
app.use('/admin', adminRouter)

//mongoose error handler
app.use(mongooseErrorHandler);

//global error handler
app.use(globalErrorHandler);
module.exports = app;