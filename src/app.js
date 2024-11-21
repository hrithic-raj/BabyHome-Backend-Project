const express = require('express');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const addressRouter = require('./routes/addressRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const adminRouter = require('./routes/adminRoutes');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const mongooseErrorHandler = require('./middlewares/mongooseErrorHandler');
const app = express();

app.use(express.urlencoded({extended: true}));

//allow frontend
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)

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